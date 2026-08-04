import { Router, RouterStateSnapshot } from "@angular/router";
import { AuthStore } from "./auth.store";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(private authStore: AuthStore, private router: Router) { }

  canActivate(_route: unknown, state: RouterStateSnapshot) {
    if (this.authStore.isAuthenticated()) {
      return true;
    }
    this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
