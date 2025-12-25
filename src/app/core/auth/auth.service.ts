import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthStore } from "./auth.store";
import { AuthResponse } from "./auth.model";

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(
    private http: HttpClient,
    private authStore: AuthStore
  ) { }

  login(email: string, password: string) {
    return this.http.post<AuthResponse>(
      '/api/auth/login',
      { email, password }
    ).subscribe(res => {
      this.authStore.setAuth(res.user, res.accessToken);
      localStorage.setItem('token', res.accessToken);
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.authStore.clear();
  }

  restoreSession() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authStore.setAuth({ id: 0, email: '' }, token);
    }
  }
}
