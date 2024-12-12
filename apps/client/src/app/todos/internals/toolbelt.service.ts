import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Todo, TodoApi } from '../models';

@Injectable()
export class Toolbelt {
  constructor(private snackbar: MatSnackBar) {}

  toTodoApi(todo: Todo): TodoApi {
    return {
      id: todo.id,
      isComplete: todo.isDone,
      isPinned: todo.isPinned,
      text: todo.text
    };
  }

  toTodo(todoApi: TodoApi): Todo {
    return { 
      id: todoApi.id,
      isDone: todoApi.isComplete,
      isPinned: todoApi.isPinned,
      text: todoApi.text
    }
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
