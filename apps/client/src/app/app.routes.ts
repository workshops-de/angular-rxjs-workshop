import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'todos' },
  {
    path: 'todos',
    loadChildren: () =>
      import('./todos/internals/todos.module').then(m => m.TodosModule)
  }
];

