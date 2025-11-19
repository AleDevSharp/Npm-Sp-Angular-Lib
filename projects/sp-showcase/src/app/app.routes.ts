import { Routes } from '@angular/router';

// Application routes
export const routes: Routes = [
  { path: '', redirectTo: 'showcase', pathMatch: 'full' },
  {
    path: 'showcase',
    loadComponent: () => import('../app/pages/home/home.component').then((c) => c.HomeComponent)
  },
  {
    path: 'buttons',
    loadComponent: () => import('../app/pages/buttons-page/buttons-page.component').then((c) => c.ButtonsPageComponent)
  },
  {
    path: 'inputs',
    loadComponent: () => import('../app/pages/inputs-page/inputs-page.component').then((c) => c.InputsPageComponent)
  },
  {
    path: 'select',
    loadComponent: () => import('../app/pages/select-page/select-page.component').then((c) => c.SelectPageComponent)
  },
  {
    path: 'switch',
    loadComponent: () => import('../app/pages/switch-page/switch-page.component').then((c) => c.SwitchPageComponent)
  },
  {
    path: 'progress-bars',
    loadComponent: () => import('../app/pages/progress-bars-page/progress-bars-page.component').then((c) => c.ProgressBarsPageComponent)
  },
  {
    path: 'dividers',
    loadComponent: () => import('../app/pages/dividers-page/dividers-page.component').then((c) => c.DividersPageComponent)
  },

  { path: '**', redirectTo: 'showcase' }
];
