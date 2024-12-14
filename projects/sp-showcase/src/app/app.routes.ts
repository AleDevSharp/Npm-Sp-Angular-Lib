import { Routes } from '@angular/router';

// Application routes
export const routes: Routes = [
  { path: '', redirectTo: 'showcase', pathMatch: 'full' },
  { path: 'showcase', loadComponent: () => import('../app/pages/home/home.component').then((c) => c.HomeComponent) },
  { path: '**', redirectTo: 'showcase' }
];
