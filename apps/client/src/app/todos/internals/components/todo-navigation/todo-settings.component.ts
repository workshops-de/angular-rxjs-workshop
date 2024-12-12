import { Component, OnInit } from '@angular/core';
import { Todo } from '../../../models';
import {
  TodoSettings,
  TodoSettingsOptions
} from '../../../todo-settings.service';
import { Observable } from 'rxjs';
import { MatDialogModule } from '@angular/material/dialog';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'dos-todo-settings',
  imports:[MatDialogModule, AsyncPipe],
  template: `
    <h2 mat-dialog-title>Settings</h2>
    @if(settings$ | async; as settings) {
    <mat-dialog-content>
      <input
        #todoTextInput
        type="number"
        class="todo__input"
        placeholder="What needs to be done?"
        [value]="settings.pollingInterval"
        (change)="updateInterval($any($event))"
        (keyup.enter)="updateInterval($any($event))"
      />

      <div class="todo">
        <label class="todo__label"
          >Enable Polling
          <input
            type="checkbox"
            [checked]="settings.isPollingEnabled"
            (change)="togglePolling($any($event))"
          />
          <span class="todo__checkmark"></span>
        </label>
      </div>
    </mat-dialog-content>
  }

    <mat-dialog-actions align="end">
      <button mat-dialog-close="" class="todo__button--primary">
        CLOSE
      </button>
    </mat-dialog-actions>
  `
})
export class TodoSettingsComponent {
  settings$: Observable<Partial<TodoSettingsOptions>>;

  constructor(private todoSettings: TodoSettings) {
    this.settings$ = todoSettings.settings$;
  }

  togglePolling(event: Event & { target: { checked: boolean } }) {
    this.todoSettings.update({ isPollingEnabled: event.target.checked });
  }

  updateInterval(event: Event & { target: { value: string } }) {
    this.todoSettings.update({ pollingInterval: +event.target.value });
  }
}
