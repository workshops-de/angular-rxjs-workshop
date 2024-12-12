import { Component, Input } from '@angular/core';
import { Todo } from '../../../models';
import { MatListModule } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { PinnedPipe } from './pinned.pipe';

@Component({
  selector: 'dos-todos-pinned',
  imports: [MatListModule, MatIcon, PinnedPipe],
  template: `
  @if(todos && todos.length > 0) {
    <h3 class="mat-h3">Pinned</h3>
      <mat-list>
        @for(todo of todos | pinned; track todo.id) {
        <mat-list-item>
          <mat-icon mat-list-icon>beenhere</mat-icon>
          {{ todo.text }}
        </mat-list-item>
        }
      </mat-list>
    }
  `,
  styles: [
    `
      :host {
        display: block;
        margin-top: 16px;
      }
    `
  ]
})
export class TodosPinnedComponent {
  @Input() todos: Todo[]|null = [];
}
