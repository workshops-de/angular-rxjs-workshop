import { Component, HostBinding, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Todo } from './models';
import { TodosService } from './shared/todos.service';
import { catchError, tap } from 'rxjs/operators';
import { Toolbelt } from './shared/toolbelt.service';

@Component({
  selector: 'dos-todos',
  templateUrl: './todos.component.html'
})
export class TodosComponent implements OnDestroy {
  private sink = new Subscription();

  todos$: Observable<Todo[]>;

  @HostBinding('class') cssClass = 'todo__app';

  constructor(private todosService: TodosService, private toolbelt: Toolbelt) {
    this.todos$ = this.todosService.query().pipe(
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
