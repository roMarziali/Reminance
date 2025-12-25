import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import { AuthStore } from '../../auth/auth.store';
import { AuthService } from '../../auth/auth.service';
@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  constructor(private authStore: AuthStore, private auth: AuthService) { }

  get isAuth(): boolean {
    return this.authStore.isAuthenticated()
  }

  public logout() {
    return this.auth.logout();
  }

}
