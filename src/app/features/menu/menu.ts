import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-menu',
  imports: [MatCardModule, MatIconModule],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {

  constructor(private router: Router) { }

  goTo(page: 'reminance' | 'bourse') {
    this.router.navigate([page]);
  }
}
