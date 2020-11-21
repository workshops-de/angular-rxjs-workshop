import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Toolbelt } from './internals';
import { Todo, TodoApi } from './models';
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

  // TODO: Fix the return type of this method
  private query(): Observable<any> {
    return this.http.get<TodoApi[]>(`${todosUrl}`);
    // TODO: Apply mapping to fix display of tasks
  }

  create(todo: Todo): Observable<TodoApi> {
    return this.http.post<TodoApi>(todosUrl, todo);
  }

  remove(todoForRemoval: TodoApi): Observable<Todo> {
    return this.http
      .delete<TodoApi>(`${todosUrl}/${todoForRemoval.id}`)
      .pipe(map((todo) => this.toolbelt.toTodo(todo)));
  }

  completeOrIncomplete(todoForUpdate: Todo): Observable<Todo> {
    const updatedTodo = this.toggleTodoState(todoForUpdate);
    return this.http
      .put<TodoApi>(
        `${todosUrl}/${todoForUpdate.id}`,
        this.toolbelt.toTodoApi(updatedTodo)
      )
      .pipe(map((todo) => this.toolbelt.toTodo(todo)));
  }

  private toggleTodoState(todoForUpdate: Todo): any {
    return {
      ...todoForUpdate,
      isDone: todoForUpdate.isDone ? false : true,
    };
  }
}
