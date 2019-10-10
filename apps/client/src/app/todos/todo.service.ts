import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo, TodoApi } from './models';
import {
  map,
  tap
} from 'rxjs/operators';
import { Toolbelt } from './internals';
import { TodoSettings } from './todo-settings.service';

const todosUrl = 'http://localhost:3333/api';

@Injectable()
export class TodoService {
  constructor(
    private http: HttpClient,
    private toolbelt: Toolbelt,
    private settings: TodoSettings
  ) {}

  loadFrequently() {
    // TODO: Introduce error handled, configured, recurring, all-mighty stream
    return this.query().pipe(
      tap({ error: () => this.toolbelt.offerHardReload() })
    );
  }

  private query(): Observable<Todo[]> {
    return (
      this.http
        .get<TodoApi[]>(`${todosUrl}`)
        // TODO: apply mapping to fix display of tasks
        .pipe(map(todos => todos.map(todo => this.toolbelt.deserialize(todo))))
    );
  }

  create(todo: Todo): Observable<TodoApi> {
    return this.http.post<TodoApi>(todosUrl, todo);
  }

  remove(todoForRemoval: TodoApi): Observable<Todo> {
    return this.http
      .delete<TodoApi>(`${todosUrl}/${todoForRemoval.id}`)
      .pipe(map(todo => this.toolbelt.deserialize(todo)));
  }

  completeOrIncomplete(todoForUpdate: Todo): Observable<Todo> {
    const updatedTodo = this.toggleTodoState(todoForUpdate);
    return this.http
      .put<TodoApi>(
        `${todosUrl}/${todoForUpdate.id}`,
        this.toolbelt.serialize(updatedTodo)
      )
      .pipe(map(todo => this.toolbelt.deserialize(todo)));
  }

  private toggleTodoState(todoForUpdate: Todo): any {
    return {
      ...todoForUpdate,
      isDone: todoForUpdate.isDone ? false : true
    };
  }
}
