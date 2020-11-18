import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Todo, TodoApi } from '../models';

@Injectable()
export class Toolbelt {
  constructor(private snackbar: MatSnackBar) {}

  serialize(todo: Todo): TodoApi {
    const mappedTodo = {
      ...todo,
      isComplete: todo.isDone
    };
    delete mappedTodo.isDone;
    return mappedTodo;
  }

  deserialize(todoApi: TodoApi): Todo {
    const mappedTodo = {
      ...todoApi,
      isDone: todoApi.isComplete
    };
    delete mappedTodo.isComplete;
    return mappedTodo;
  }

  offerHardReload() {
    const openDialog = this.snackbar.open(
      'Was not able loading todos',
      'Retry'
    );

    const afterAction = openDialog.onAction().subscribe(() => {
      location.reload();
      afterAction.unsubscribe();
    });
  }
}
