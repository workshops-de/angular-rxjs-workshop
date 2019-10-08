import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { merge, Observable, Subject, Subscription, timer } from 'rxjs';
import { Todo } from './models';
import { TodosService } from './shared/todos.service';
import {
  exhaustMap,
  first,
  map,
  retryWhen,
  switchMap,
  take,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import { Toolbelt } from './shared/toolbelt.service';

@Component({
  selector: 'dos-todos',
  templateUrl: './todos.component.html'
})
export class TodosComponent implements OnInit, OnDestroy {
  private sink = new Subscription();

  update$$ = new Subject();

  reloadEvery5Seconds$ = timer(0, 5000);
  sourceTodos$ = this.reloadEvery5Seconds$.pipe(
    exhaustMap(() => this.todosService.query()),
    retryWhen(errors =>
      errors.pipe(switchMap(() => timer(1000).pipe(take(5))))
    ),
    tap({
      error: () => this.toolbelt.offerHardReload()
    })
  );

  initialTodos$: Observable<Todo[]>;
  mostRecentTodos$: Observable<Todo[]>;
  todos$: Observable<Todo[]>;

  @HostBinding('class') cssClass = 'todo__app';

  constructor(private todosService: TodosService, private toolbelt: Toolbelt) {}

  ngOnInit(): void {
    this.initialTodos$ = this.sourceTodos$.pipe(first());
    this.mostRecentTodos$ = this.update$$.pipe(
      withLatestFrom(this.sourceTodos$),
      map(([, todos]) => todos)
    );

    this.todos$ = merge(this.initialTodos$, this.mostRecentTodos$);
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
