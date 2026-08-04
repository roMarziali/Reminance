import { Component, OnInit, signal } from '@angular/core';
import { Stock } from '../../core/models/stock.model';
import { BourseService } from './services/bourse.service';
import { StockTable } from './stock-table/stock-table';

@Component({
  selector: 'app-bourse',
  imports: [StockTable],
  templateUrl: './bourse.html',
  styleUrl: './bourse.scss',
})
export class Bourse implements OnInit {

  watchedStocks = signal<Stock[]>([]);

  cacLarge60 = signal<Stock[]>([]);
  sp500 = signal<Stock[]>([]);

  loadingCac = signal(true);
  loadingSp = signal(true);

  constructor(private bourseService: BourseService) { }

  ngOnInit() {
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
}
