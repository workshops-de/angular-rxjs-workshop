import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../models';

@Component({
  selector: 'dos-todo-checker',
  templateUrl: './todo-checker.component.html',
  styleUrls: ['./todo-checker.component.scss']
})
export class TodoCheckerComponent {
  @Input() todo: Todo;
  @Output() toggle = new EventEmitter<Todo>();
  @Output() remove = new EventEmitter<Todo>();

  emitToggle() {
    this.toggle.emit(this.todo);
  }

  emitRemove() {
    this.remove.emit(this.todo);
  }
}
