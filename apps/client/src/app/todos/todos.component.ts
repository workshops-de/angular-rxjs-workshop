import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { merge, Observable, Subject, Subscription, timer } from 'rxjs';
import { Todo } from './models';
import { TodosService } from './shared/todos.service';
import {
  exhaustMap,
  first,
  map,
  mapTo,
  retryWhen,
  skip,
  switchMap,
  take,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import { Toolbelt } from './shared/toolbelt.service';
import { MatDialog } from '@angular/material';
import { TodoSettingsComponent } from './todo-settings/todo-settings.component';

@Component({
  selector: 'dos-todos',
  templateUrl: './todos.component.html'
})
export class TodosComponent implements OnInit, OnDestroy {
  private sink = new Subscription();

  update$$ = new Subject();

  sourceTodos$ = this.todosService.loadFrequently();

  initialTodos$: Observable<Todo[]>;
  mostRecentTodos$: Observable<Todo[]>;
  todos$: Observable<Todo[]>;

  show$: Observable<boolean>;
  hide$: Observable<boolean>;
  showReload$: Observable<boolean>;

  @HostBinding('class') cssClass = 'todo__app';

  constructor(private todosService: TodosService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.initialTodos$ = this.sourceTodos$.pipe(first());
    this.mostRecentTodos$ = this.update$$.pipe(
      withLatestFrom(this.sourceTodos$),
      map(([, todos]) => todos)
    );

    this.todos$ = merge(this.initialTodos$, this.mostRecentTodos$);
    this.show$ = this.sourceTodos$.pipe(
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

  openSettings() {
    this.dialog.open(TodoSettingsComponent);
  }
}
