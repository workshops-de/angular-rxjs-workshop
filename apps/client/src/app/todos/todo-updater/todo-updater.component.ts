import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'dos-todo-updater',
  template:
    '<button (click)="reload.emit()" class="todo__button--primary">RELOAD</button>',
  styles: [``]
})
export class TodoUpdaterComponent {
  @Output() reload = new EventEmitter<void>();
}
