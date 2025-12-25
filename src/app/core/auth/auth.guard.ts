import { Router } from "@angular/router";
import { AuthStore } from "./auth.store";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(private authStore: AuthStore, private router: Router) { }

  canActivate() {
    if (this.authStore.isAuthenticated()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
