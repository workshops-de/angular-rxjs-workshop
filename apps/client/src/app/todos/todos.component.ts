import { Component, OnInit } from '@angular/core';
import { merge, Observable, Subject } from 'rxjs';
import { first, map, mapTo, skip, withLatestFrom } from 'rxjs/operators';
import { Todo } from './models';
import { TodoService } from './todo.service';

@Component({
  selector: 'dos-todos',
  templateUrl: './todos.component.html'
})
export class TodosComponent implements OnInit {
  todos$: Observable<Todo[]>;
  todosSource$ = this.todosService.loadFrequently();
  todosInitial$: Observable<Todo[]>;
  todosMostRecent$: Observable<Todo[]>;

  update$$ = new Subject();
  show$: Observable<boolean>;
  hide$: Observable<boolean>;
  showReload$: Observable<boolean>;

  constructor(private todosService: TodoService) {}

  ngOnInit(): void {
    this.initializeTodos();
    this.showReloadOnUpdates();
  }

  private initializeTodos() {
    this.todosInitial$ = this.todosSource$.pipe(first());
    this.todos$ = this.todosSource$;
    this.todosMostRecent$ = this.update$$.pipe(
      withLatestFrom(this.todosSource$),
      map(([, todos]) => todos)
    );

    this.todos$ = merge(this.todosInitial$, this.todosMostRecent$);
  }

  private showReloadOnUpdates() {
    this.show$ = this.todosSource$.pipe(skip(1), mapTo(true));
    this.hide$ = this.update$$.pipe(mapTo(false));

    this.showReload$ = merge(this.show$, this.hide$);
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
