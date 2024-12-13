import { Routes } from '@angular/router';
import { TodosComponent } from '../todos.component';

export const todoRoutes: Routes = [
  { path: '', redirectTo: 'all', pathMatch: 'full' },
  { path: ':query', component: TodosComponent }
];
