import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Todo, TodoApi } from '../models';

@Injectable({ providedIn: 'root' })
export class Toolbelt {
  constructor(private snackbar: MatSnackBar) {}

  static todo = {
    serialize(todo: Todo): TodoApi {
      const mappedTodo = {
        ...todo,
        isComplete: todo.isDone
      };
      delete mappedTodo.isDone;
      return mappedTodo;
    },

    deserialize(todoApi: TodoApi): Todo {
      const mappedTodo = {
        ...todoApi,
        isDone: todoApi.isComplete
      };
      delete mappedTodo.isComplete;
      return mappedTodo;
    }
  };

  handleTodosLoadError() {}
}
