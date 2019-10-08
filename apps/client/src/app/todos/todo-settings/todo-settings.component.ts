import { Component, OnInit } from '@angular/core';
import { Todo } from '../models';
import {
  TodoSettings,
  TodoSettingsOptions
} from '../shared/todo-settings.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'dos-todo-settings',
  template: `
    <h2 class="mat-h2">Settings</h2>
    <ng-container *ngIf="settings$ | async as settings">
      <div class="todo">
        <label class="todo__label"
          >Enable Polling
          <input
            type="checkbox"
            [checked]="settings.isPollingEnabled"
            (change)="togglePolling($event)"
          />
          <span class="todo__checkmark"></span>
        </label>
      </div>
    </ng-container>
  `
})
export class TodoSettingsComponent implements OnInit {
  settings$: Observable<Partial<TodoSettingsOptions>>;

  constructor(private todoSettings: TodoSettings) {
    this.settings$ = todoSettings.settings$;
  }

  togglePolling(event: Event & { target: { checked: boolean } }) {
    this.todoSettings.update({ isPollingEnabled: event.target.checked });
  }

  ngOnInit() {}
}
