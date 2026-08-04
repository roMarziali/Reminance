import { Routes } from '@angular/router';
import { WorkList } from './features/works/work-list/work-list';
import { AuthGuard } from './core/auth/auth.guard';
import { Login } from './features/auth/login/login';
import { Menu } from './features/menu/menu';
import { Bourse } from './features/bourse/bourse';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'menu', component: Menu, canActivate: [AuthGuard] },
  { path: 'reminance', component: WorkList, canActivate: [AuthGuard] },
  { path: 'bourse', component: Bourse, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' },
];
