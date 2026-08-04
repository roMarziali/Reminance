import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Stock } from '../../core/models/stock.model';
import { BourseService } from './services/bourse.service';
import { StockTable } from './stock-table/stock-table';

@Component({
  selector: 'app-bourse',
  imports: [StockTable, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './bourse.html',
  styleUrl: './bourse.scss',
})
export class Bourse implements OnInit {

  watchedStocks = signal<Stock[]>([]);
  loadingWatched = signal(true);
  watchedQuery = '';
  watchedError = signal('');

  cacLarge60 = signal<Stock[]>([]);
  sp500 = signal<Stock[]>([]);

  loadingCac = signal(true);
  loadingSp = signal(true);

  constructor(private bourseService: BourseService) { }

  ngOnInit() {
    this.loadWatched();

    this.bourseService.getCacLarge60().subscribe({
      next: data => {
        this.cacLarge60.set(data);
        this.loadingCac.set(false);
      },
      error: () => this.loadingCac.set(false)
    });

    this.bourseService.getSp500().subscribe({
      next: data => {
        this.sp500.set(data);
        this.loadingSp.set(false);
      },
      error: () => this.loadingSp.set(false)
    });
  }

  loadWatched() {
    this.loadingWatched.set(true);
    this.bourseService.getWatched().subscribe({
      next: data => {
        this.watchedStocks.set(data);
        this.loadingWatched.set(false);
      },
      error: () => this.loadingWatched.set(false)
    });
  }

  addWatchedStock() {
    const query = this.watchedQuery.trim();
    if (!query) return;

    this.watchedError.set('');
    this.bourseService.addWatched(query).subscribe({
      next: () => {
        this.watchedQuery = '';
        this.loadWatched();
      },
      error: err => this.watchedError.set(err.error?.message ?? "Erreur lors de l'ajout de l'action")
    });
  }

  removeWatchedStock(symbol: string) {
    this.bourseService.removeWatched(symbol).subscribe({
      next: () => this.loadWatched()
    });
  }
}
