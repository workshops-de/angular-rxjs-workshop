import { Component, EventEmitter, Output } from '@angular/core';
import { Todo } from '../../../models';

@Component({
  selector: 'dos-todo-quick-add',
  templateUrl: './todo-quick-add.component.html',
  styleUrls: ['./todo-quick-add.component.scss']
})
export class TodoQuickAddComponent {
  @Output() create = new EventEmitter<Todo>();

  emitCreate(textInput: HTMLInputElement) {
    this.create.emit({
      id: 1,
      text: textInput.value,
      isDone: false,
      isPinned: false
    });
    textInput.value = '';
  }
}
