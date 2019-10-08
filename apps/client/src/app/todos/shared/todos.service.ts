import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo, TodoApi } from '../models';
import { map, shareReplay } from 'rxjs/operators';
import { Toolbelt } from './toolbelt.service';

const todosUrl = 'http://localhost:3333/api';

@Injectable({ providedIn: 'root' })
export class TodosService {
  constructor(private http: HttpClient) {}

  query(param?: string): Observable<Todo[]> {
    return (
      this.http
        .get<TodoApi[]>(`${todosUrl}?query=${param ? param : 'all'}`)
        // Task apply mapping
        .pipe(
          map(todos => todos.map(todo => Toolbelt.todo.deserialize(todo))),
          shareReplay(1)
        )
    );
  }

  create(todo: Todo): Observable<TodoApi> {
    return this.http.post<TodoApi>(todosUrl, todo);
  }

  remove(todoForRemoval: TodoApi): Observable<Todo> {
    return this.http
      .delete<TodoApi>(`${todosUrl}/${todoForRemoval.id}`)
      .pipe(map(todo => Toolbelt.todo.deserialize(todo)));
  }

  completeOrIncomplete(todoForUpdate: Todo): Observable<Todo> {
    const updatedTodo = this.toggleTodoState(todoForUpdate);
    return this.http
      .put<TodoApi>(
        `${todosUrl}/${todoForUpdate.id}`,
        Toolbelt.todo.serialize(updatedTodo)
      )
      .pipe(map(todo => Toolbelt.todo.deserialize(todo)));
  }

  private toggleTodoState(todoForUpdate: Todo): any {
    return {
      ...todoForUpdate,
      isDone: todoForUpdate.isDone ? false : true
    };
  }
}
