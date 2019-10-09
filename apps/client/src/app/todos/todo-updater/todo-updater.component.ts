import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'dos-todo-updater',
  template:
    '<button *ngIf="isShown" (click)="reload.emit()" class="todo__button--primary">RELOAD</button>',
  styles: [
    `
      :host {
        display: block;
        background: #4503bfc2;
        min-height: 35px;
        padding: 8px;
        text-align: center;
      }
    `
  ]
})
export class TodoUpdaterComponent {
  @Input() isShown = false;
  @Output() reload = new EventEmitter<void>();
}
