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
import { TodoSettingsComponent } from './todo-settings/todo-settings.component';
import { MatDialogModule, MatSnackBarModule } from '@angular/material';
import { Toolbelt } from './shared/toolbelt.service';

@NgModule({
  declarations: [
    TodoCheckerComponent,
    TodoQuickAddComponent,
    TodosComponent,
    TodoCounterComponent,
    TodosLinkNavigationComponent,
    TodosApiErrorComponent,
    TodoUpdaterComponent,
    TodoSettingsComponent
  ],
  entryComponents: [TodoSettingsComponent],
  imports: [
    CommonModule,
    TodosRoutingModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  exports: [TodosComponent],
  providers: [Toolbelt]
})
export class TodosModule {}
