import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo, TodoApi } from '../models';
import { map } from 'rxjs/operators';

const todosUrl = 'http://localhost:3333/api';

@Injectable({ providedIn: 'root' })
export class TodosService {
  constructor(private http: HttpClient) {}

  query(param?: string): Observable<Todo[]> {
    return (
      this.http
        .get<TodoApi[]>(`${todosUrl}?query=${param ? param : 'all'}`)
        // Task apply mapping
        .pipe(map(todos => todos.map(todo => deserialize(todo))))
    );
  }

  create(todo: Todo): Observable<TodoApi> {
    return this.http.post<TodoApi>(todosUrl, todo);
  }

  remove(todoForRemoval: TodoApi): Observable<Todo> {
    return this.http
      .delete<TodoApi>(`${todosUrl}/${todoForRemoval.id}`)
      .pipe(map(todo => deserialize(todo)));
  }

  completeOrIncomplete(todoForUpdate: Todo): Observable<Todo> {
    const updatedTodo = this.toggleTodoState(todoForUpdate);
    return this.http
      .put<TodoApi>(`${todosUrl}/${todoForUpdate.id}`, serialize(updatedTodo))
      .pipe(map(todo => deserialize(todo)));
  }

  private toggleTodoState(todoForUpdate: Todo): any {
    return {
      ...todoForUpdate,
      isDone: todoForUpdate.isDone ? false : true
    };
  }
}

function serialize(todo: Todo): TodoApi {
  const mappedTodo = {
    ...todo,
    isComplete: todo.isDone
  };
  delete mappedTodo.isDone;
  return mappedTodo;
}

function deserialize(todoApi: TodoApi): Todo {
  const mappedTodo = {
    ...todoApi,
    isDone: todoApi.isComplete
  };
  delete mappedTodo.isComplete;
  return mappedTodo;
}
