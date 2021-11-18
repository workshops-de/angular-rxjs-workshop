import { Component, OnInit } from '@angular/core';
import {
  first,
  map,
  merge,
  Observable,
  of,
  Subject,
  switchMap,
  tap,
  withLatestFrom
} from 'rxjs';
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

  update$$ = new Subject<void>();
  show$: Observable<boolean>;
  hide$: Observable<boolean>;
  showReload$: Observable<boolean> = of(true);

  constructor(private todosService: TodoService) {}

  ngOnInit(): void {
    // TODO: Control update of todos in App (back pressure)
    this.todosInitial$ = this.todosSource$.pipe(first());
    this.todosMostRecent$ = this.update$$.pipe(
      withLatestFrom(this.todosSource$),
      map((data) => data[1])
      // map(([,todos]) => todos)
    );

    // show initially loaded todos & newest todos after button-click to user
    this.todos$ = merge(this.todosInitial$, this.todosMostRecent$);
    // this.todosMostRecent$ = this.update$$.pipe(
    //   withLatestFrom(this.todosSource$),
    //   map((data) => data[1])
    // );
    // this.todos$ = merge(this.todosInitial$, this.todosMostRecent$).pipe(
    //   tap((data) => console.log(data))
    // );

    // this.todos$ = merge(
    //   this.todosInitial$,
    //   this.update$$.pipe(
    //     tap((f) => console.log(f)),
    //     switchMap(() => this.todosSource$)
    //   )
    // ).pipe(tap((data) => console.log(data)));

    // setInterval(() => this.todosService.loadFrequently().subscribe(), 1500);

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
