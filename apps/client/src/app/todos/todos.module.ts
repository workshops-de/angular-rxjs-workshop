import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TodoCheckerComponent } from './todo-checker/todo-checker.component';
import { TodoCounterComponent } from './todo-counter/todo-counter.component';
import { TodoQuickAddComponent } from './todo-quick-add/todo-quick-add.component';
import { TodosRoutingModule } from './todos-routing.module';
import { TodosComponent } from './todos.component';
import { TodosLinkNavigationComponent } from './todos-link-navigation/todos-link-navigation.component';
import { TodosApiErrorComponent } from './todos-api-error/todos-api-error.component';
import { TodoUpdaterComponent } from './todo-updater/todo-updater.component';
import { TodoSettingsComponent } from './todo-navigation/todo-settings.component';
import {
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatListModule,
  MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';
import { Toolbelt } from './shared/toolbelt.service';
import { TodoSettings } from './shared/todo-settings.service';
import { TodoService } from './shared/todo.service';
import { TodoNavigationComponent } from './todo-navigation/todo-navigation.component';

@NgModule({
  declarations: [
    TodoCheckerComponent,
    TodoQuickAddComponent,
    TodosComponent,
    TodoCounterComponent,
    TodosLinkNavigationComponent,
    TodosApiErrorComponent,
    TodoUpdaterComponent,
    TodoSettingsComponent,
    TodoNavigationComponent
  ],
  entryComponents: [TodoSettingsComponent],
  imports: [
    CommonModule,
    TodosRoutingModule,
    MatDialogModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule
  ],
  exports: [TodosComponent],
  providers: [Toolbelt, TodoSettings, TodoService]
})
export class TodosModule {}
