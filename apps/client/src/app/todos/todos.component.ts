import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { merge, Observable, Subject, Subscription, timer } from 'rxjs';
import { Todo } from './models';
import { TodoService } from './shared/todo.service';
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

  todos$: Observable<Todo[]>;
  todosSource$ = this.todosService.loadFrequently();
  todosInitial$: Observable<Todo[]>;
  todosMostRecent$: Observable<Todo[]>;

  update$$ = new Subject();
  show$: Observable<boolean>;
  hide$: Observable<boolean>;
  showReload$: Observable<boolean>;

  @HostBinding('class') cssClass = 'todo__app';

  constructor(private todosService: TodoService, private dialog: MatDialog) {}

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

  openSettings() {
    this.dialog.open(TodoSettingsComponent);
  }
}
