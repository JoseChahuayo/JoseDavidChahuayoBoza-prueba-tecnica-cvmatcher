import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'name',
    loadComponent: () => import('./pages/name/name-page.component'),
  },
  {
    path: 'jobs',
    loadComponent: () => import('./pages/jobs/jobs-page.component'),
  },
  {
    path: '**',
    redirectTo: 'name',
  }
];
