import { Routes } from '@angular/router';
import { WorkList } from './features/works/work-list/work-list';
import { AuthGuard } from './core/auth/auth.guard';
import { Login } from './features/auth/login/login';

export const routes: Routes = [
  {
    path: '',
    component: Login
  },
  {
    path: 'main',
    component: WorkList,
    canMatch: [AuthGuard]
  }
];
