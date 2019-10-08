import { Component, HostBinding, OnDestroy } from '@angular/core';
import { Observable, Subscription, timer } from 'rxjs';
import { Todo } from './models';
import { TodosService } from './shared/todos.service';
import { exhaustMap, retryWhen, switchMap, take, tap } from 'rxjs/operators';
import { Toolbelt } from './shared/toolbelt.service';

@Component({
  selector: 'dos-todos',
  templateUrl: './todos.component.html'
})
export class TodosComponent implements OnDestroy {
  private sink = new Subscription();

  todos$: Observable<Todo[]>;

  @HostBinding('class') cssClass = 'todo__app';

  reloadEvery5Seconds$ = timer(0, 5000);

  constructor(private todosService: TodosService, private toolbelt: Toolbelt) {
    this.todos$ = this.reloadEvery5Seconds$.pipe(
      exhaustMap(() => this.todosService.query()),
      retryWhen(errors =>
        errors.pipe(switchMap(() => timer(1000).pipe(take(5))))
      ),
      tap({
        error: () => this.toolbelt.offerHardReload()
      })
    );
  }

  ngOnDestroy(): void {
    this.sink.unsubscribe();
  }

  completeOrIncompleteTodo(todoForUpdate: Todo) {
    this.sink.add(
      this.todosService.completeOrIncomplete(todoForUpdate).subscribe()
    );
  }
}
