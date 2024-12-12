import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'dos-todo-updater',
  template: `
    @if(isShown) {
      <button (click)="reload.emit()" class="todo__button--primary">RELOAD</button>
    }
    `,
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
  @Input() isShown: boolean|null = false;
  @Output() reload = new EventEmitter<void>();
}
