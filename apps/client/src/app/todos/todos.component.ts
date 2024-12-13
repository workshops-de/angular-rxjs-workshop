import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable, of, Subject } from 'rxjs';
import { Todo } from './models';
import { TodoService } from './todo.service';
import { TodosPinnedComponent } from './internals/components/todos-pinned/todos-pinned.component';
import { TodoUpdaterComponent } from './internals/components/todo-updater/todo-updater.component';
import { TodoCounterComponent } from './internals/components/todo-counter/todo-counter.component';
import { TodoCheckerComponent } from './internals/components/todo-checker/todo-checker.component';
import { TodoNavigationComponent } from './internals/components/todo-navigation/todo-navigation.component';

@Component({
  selector: 'dos-todos',
  imports: [
    TodosPinnedComponent,
    TodoUpdaterComponent,
    TodoCounterComponent,
    TodoCheckerComponent,
    TodoNavigationComponent,
    AsyncPipe
  ],
  templateUrl: './todos.component.html'
})
export class TodosComponent implements OnInit {
  private todosService = inject(TodoService);

  todos$ = new Observable<Todo[]>();
  todosSource$ = this.todosService.loadFrequently();
  todosInitial$ = new Observable<Todo[]>();
  todosMostRecent$ = new Observable<Todo[]>();

  update$$ = new Subject<void>();
  show$ = new Observable<boolean>();
  hide$ = new Observable<boolean>();
  showReload$: Observable<boolean> = of(true);

  ngOnInit(): void {
    // TODO: Control update of todos in App (back pressure)
    this.todos$ = this.todosSource$;

    // TODO: Control display of refresh button
  }

  completeOrIncompleteTodo(todoForUpdate: Todo) {
    /*
     * Note in order to keep the code clean for the workshop we did not
     * handle the following subscription.
     * Normally you want to unsubscribe.
     *
     * We just want to focus you on RxJS.
     */
    this.todosService.completeOrIncomplete(todoForUpdate).subscribe();
  }
}
