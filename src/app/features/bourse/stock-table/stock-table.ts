import { Component, effect, EventEmitter, Input, OnChanges, Output, viewChild } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Stock } from '../../../core/models/stock.model';

@Component({
  selector: 'app-stock-table',
  imports: [MatTableModule, MatSortModule, MatCardModule, MatProgressSpinnerModule, MatIconModule, MatButtonModule, DecimalPipe],
  templateUrl: './stock-table.html',
  styleUrl: './stock-table.scss',
})
export class StockTable implements OnChanges {
  @Input() title = '';
  @Input() stocks: Stock[] = [];
  @Input() loading = false;
  @Input() emptyMessage = 'Aucune donnée disponible';
  @Input() removable = false;
  @Output() remove = new EventEmitter<string>();

  sort = viewChild(MatSort);

  dataSource = new MatTableDataSource<Stock>([]);
  columnsToDisplay = ['name', 'dayChangePercent', 'fiveDayChangePercent', 'link'];

  constructor() {
    // le tableau n'existe dans le DOM que lorsque le chargement est terminé (cf. @if dans le template) :
    // MatSort n'est donc disponible qu'après ce moment, d'où l'usage d'un effect plutôt que ngAfterViewInit.
    effect(() => {
      const sort = this.sort();
      if (sort) {
        this.dataSource.sort = sort;
      }
    });
  }

  ngOnChanges() {
    this.dataSource.data = this.stocks;
    this.columnsToDisplay = this.removable
      ? ['name', 'dayChangePercent', 'fiveDayChangePercent', 'link', 'remove']
      : ['name', 'dayChangePercent', 'fiveDayChangePercent', 'link'];
  }

  googleSearchUrl(name: string): string {
    return `https://www.google.com/search?q=${encodeURIComponent(name + ' cours')}`;
  }
}
