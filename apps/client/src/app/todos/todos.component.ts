import { Component, HostBinding, OnDestroy } from '@angular/core';
import { Observable, Subscription, timer } from 'rxjs';
import { Todo } from './models';
import { TodosService } from './shared/todos.service';
import { retry, switchMap, tap } from 'rxjs/operators';
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
      switchMap(() => this.todosService.query()),
      retry(3),
      tap({
        error: () => this.toolbelt.offerHardRelaod()
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
