import { Component } from '@angular/core';
import { TodoSettingsComponent } from './todo-settings.component';
import { MatDialog } from '@angular/material/dialog';
import {  MatToolbarModule } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'dos-todo-navigation',
  imports: [MatToolbarModule, MatIcon],
  template: `
    <mat-toolbar color="primary">
      <mat-toolbar-row>
        <span>Todos</span>
        <span class="spacer"></span>
        <button mat-icon-button>
          <mat-icon (click)="openSettings()" aria-label="Open settings dialog"
            >settings</mat-icon
          >
        </button>
      </mat-toolbar-row>
    </mat-toolbar>
  `,
  styles: ['.spacer { flex: 1 1 auto; }']
})
export class TodoNavigationComponent {
  constructor(private dialog: MatDialog) {}

  openSettings() {
    this.dialog.open(TodoSettingsComponent);
  }
}
