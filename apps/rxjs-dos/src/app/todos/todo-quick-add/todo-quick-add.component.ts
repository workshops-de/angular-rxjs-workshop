import { Component, EventEmitter, Output } from '@angular/core';
import { Todo } from '../models';

@Component({
  selector: 'nde-todo-quick-add',
  templateUrl: './todo-quick-add.component.html',
  styleUrls: ['./todo-quick-add.component.scss']
})
export class TodoQuickAddComponent {
  @Output() create = new EventEmitter<Todo>();

  emitCreate(textInput: HTMLInputElement) {
    this.create.emit({ text: textInput.value, isDone: false });
    textInput.value = '';
  }
}
