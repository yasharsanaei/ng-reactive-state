import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/home.component').then((c) => c.HomeComponent)
  },
  {
    path: 'usage',
    loadComponent: () => import('./components/usage/usage.component').then((c) => c.UsageComponent)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
