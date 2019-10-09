import { Component, OnDestroy, OnInit } from '@angular/core';
import { merge, Observable, Subject, Subscription } from 'rxjs';
import { Todo } from './models';
import { TodoService } from './shared/todo.service';
import { first, map, mapTo, skip, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'dos-todos',
  templateUrl: './todos.component.html'
})
export class TodosComponent implements OnInit, OnDestroy {
  private sink = new Subscription();

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
    this.todosInitial$ = this.todosSource$.pipe(first());
    this.todosMostRecent$ = this.update$$.pipe(
      withLatestFrom(this.todosSource$),
      map(([, todos]) => todos)
    );

    this.todos$ = merge(this.todosInitial$, this.todosMostRecent$);
    this.show$ = this.todosSource$.pipe(
      skip(1),
      mapTo(true)
    );
    this.hide$ = this.update$$.pipe(mapTo(false));
    this.showReload$ = merge(this.show$, this.hide$);
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
