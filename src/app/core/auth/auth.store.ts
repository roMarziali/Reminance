import { signal, computed, Injectable } from '@angular/core';
import { AuthUser } from './auth.model';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private _user = signal<AuthUser | null>(null);
  private _token = signal<string | null>(null);

  readonly user = this._user.asReadonly();
  readonly token = this._token.asReadonly();

  readonly isAuthenticated = computed(() => !!this._token());

  setAuth(user: AuthUser, token: string) {
    this._user.set(user);
    this._token.set(token);
  }

  clear() {
    this._user.set(null);
    this._token.set(null);
  }
}
