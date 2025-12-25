import { Component, effect, ViewChild } from '@angular/core';
import { Work } from '../../../core/models/work.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SessionList } from './session-list/session-list';
import { PartialDatePipe } from '../../../shared/pipes/partial-date.pipe';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { WorkStoreService } from '../services/work-store.service';

@Component({
  selector: 'app-work-list',
  imports: [MatCardModule, MatButtonModule, FormsModule, MatTableModule, MatSortModule, SessionList, PartialDatePipe, MatInputModule, MatFormFieldModule, MatIconModule],
  templateUrl: './work-list.html',
  styleUrl: './work-list.scss',
})
export class WorkList {

  dataSource!: MatTableDataSource<Work>;
  constructor(public workStore: WorkStoreService) {
    this.dataSource = new MatTableDataSource();
    effect(() => {
      this.dataSource.data = this.workStore.works();
    });
  }

  displayedColumns: string[] = ['title', 'licenses', 'type', 'releaseDate', 'genres', 'artists', 'publishers', 'lastSessionDate', 'moods', 'sessions'];

  generalFilterValue: string = "";

  @ViewChild(MatSort) sort: MatSort | undefined;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  public displayFullArray(work: Work, param: 'titleAlias' | 'moods' | 'licenses' | 'genres' | 'artists' | 'publishers'): string {
    if (!work[param] || !work[param].length) return "";
    return work[param].join(", ")
  }

  applyGeneralFilter() {
    // Attention, filtre géré par Angular Material, ne s'applique pas au système de chip géré par le service
    const filterValue = this.generalFilterValue;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
