import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TodoCheckerComponent } from './components/todo-checker/todo-checker.component';
import { TodoCounterComponent } from './components/todo-counter/todo-counter.component';
import { TodoQuickAddComponent } from './components/todo-quick-add/todo-quick-add.component';
import { TodosRoutingModule } from './todos-routing.module';
import { TodosComponent } from '../todos.component';
import { TodosLinkNavigationComponent } from './components/todos-link-navigation/todos-link-navigation.component';
import { TodosApiErrorComponent } from './components/todos-api-error/todos-api-error.component';
import { TodoUpdaterComponent } from './components/todo-updater/todo-updater.component';
import { TodoSettingsComponent } from './components/todo-navigation/todo-settings.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Toolbelt } from './toolbelt.service';
import { TodoSettings } from '../todo-settings.service';
import { TodoService } from '../todo.service';
import { TodoNavigationComponent } from './components/todo-navigation/todo-navigation.component';
import { TodosPinnedComponent } from './components/todos-pinned/todos-pinned.component';
import { PinnedPipe } from './components/todos-pinned/pinned.pipe';

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
    TodoNavigationComponent,
    TodosPinnedComponent,
    PinnedPipe
  ],
  entryComponents: [TodoSettingsComponent],
  imports: [
    CommonModule,
    TodosRoutingModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatListModule,
    MatSnackBarModule,
    MatToolbarModule
  ],
  exports: [TodosComponent],
  providers: [Toolbelt, TodoSettings, TodoService]
})
export class TodosModule {}
