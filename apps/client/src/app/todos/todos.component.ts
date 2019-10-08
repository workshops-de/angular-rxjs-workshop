import { Component, HostBinding, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Todo } from './models';
import { TodosService } from './shared/todos.service';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'dos-todos',
  templateUrl: './todos.component.html'
})
export class TodosComponent implements OnDestroy {
  private sink = new Subscription();

  isErrorShown: boolean;
  todos$: Observable<Todo[]>;

  @HostBinding('class') cssClass = 'todo__app';

  constructor(private todosService: TodosService) {
    this.todos$ = this.todosService.query().pipe(
      tap({
        next: () => (this.isErrorShown = false),
        error: () => (this.isErrorShown = true)
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

  removeTodo(todoForRemoval: Todo) {
    this.sink.add(this.todosService.remove(todoForRemoval).subscribe());
  }
}
