import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthStore } from "./auth.store";
import { AuthResponse } from "./auth.model";
import { environment } from "../../../environments/environment";
import { Router } from "@angular/router";
@Injectable({ providedIn: 'root' })
export class AuthService {


  constructor(
    private http: HttpClient,
    private authStore: AuthStore,
    private router: Router
  ) { }

  login(email: string, password: string) {
    return this.http.post<AuthResponse>(
      `${environment.apiUrl}/api/auth/login`,
      { email, password }
    ).subscribe(res => {
      this.authStore.setAuth(res.user, res.accessToken);
      localStorage.setItem('token', res.accessToken);

      this.router.navigate(['/main']);
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.authStore.clear();
    this.router.navigate(['/']);
  }

  restoreSession() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authStore.setAuth({ id: 0, email: '' }, token);
    }
  }

  get isAuth(): boolean {
    const token = localStorage.getItem('token');
    return (token) ? true : false;
  }

}
