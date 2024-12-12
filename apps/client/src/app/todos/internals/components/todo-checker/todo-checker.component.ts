import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { Todo } from '../../../models';
import { NgClass } from '@angular/common';

@Component({
  selector: 'dos-todo-checker',
  imports: [NgClass],
  templateUrl: './todo-checker.component.html',
  styleUrls: ['./todo-checker.component.scss']
})
export class TodoCheckerComponent {
  todo = input.required<Todo>();
  @Output() toggle = new EventEmitter<Todo>();
  @Output() remove = new EventEmitter<Todo>();

  emitToggle() {
    this.toggle.emit(this.todo());
  }

  emitRemove() {
    this.remove.emit(this.todo());
  }
}
