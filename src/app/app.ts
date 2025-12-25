import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./core/layout/header/header";
import { AuthStore } from './core/auth/auth.store';
import { WorkList } from './features/works/work-list/work-list';
import { Login } from './features/auth/login/login';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, WorkList, Login],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Reminance');

  constructor(private authStore: AuthStore) { }

  get isAuth(): boolean {
    return this.authStore.isAuthenticated()
  }

}
