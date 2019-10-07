import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Todo } from './models';
import { TodosService } from './shared/todos.service';

@Component({
  selector: 'dos-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit, OnDestroy {
  private sink = new Subscription();

  todos: Todo[] = [];

  @HostBinding('class') cssClass = 'todo__app';

  constructor(
    private todosService: TodosService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.sink.add(
      this.route.paramMap
        .pipe(
          switchMap(paramMap => this.todosService.query(paramMap.get('query')))
        )
        .subscribe(todos => (this.todos = todos))
    );
  }

  ngOnDestroy(): void {
    this.sink.unsubscribe();
  }

  get activeTodos() {
    return this.todos.filter(todo => !todo.isDone).length;
  }

  addTodo(newTodo: Todo) {
    this.sink.add(
      this.todosService
        .create(newTodo)
        .pipe(switchMap(() => this.todosService.query()))
        .subscribe(todos => (this.todos = todos))
    );
  }

  completeOrIncompleteTodo(todoForUpdate: Todo) {
    this.sink.add(
      this.todosService
        .completeOrIncomplete(todoForUpdate)
        .pipe(switchMap(() => this.todosService.query()))
        .subscribe(todos => (this.todos = todos))
    );
  }

  removeTodo(todoForRemoval: Todo) {
    this.sink.add(
      this.todosService
        .remove(todoForRemoval)
        .pipe(switchMap(() => this.todosService.query()))
        .subscribe(todos => (this.todos = todos))
    );
  }
}
