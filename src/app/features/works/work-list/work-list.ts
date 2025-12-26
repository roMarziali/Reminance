import { Component, computed, effect, inject, ViewChild } from '@angular/core';
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
import { WorkChips } from './work-chips/work-chips';
import { MatChipsModule } from "@angular/material/chips";
import { WorkForm } from '../work-form/work-form';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

export type ColumnInfo = {
  label: string;
  type: 'titleFunction' | 'chipModule' | 'datePipe';
};

@Component({
  selector: 'app-work-list',
  imports: [MatCardModule, MatButtonModule, FormsModule, MatTableModule, MatSortModule, MatInputModule, MatFormFieldModule, MatIconModule,
    WorkChips, SessionList, PartialDatePipe, MatChipsModule, MatDialogModule],
  templateUrl: './work-list.html',
  styleUrl: './work-list.scss',
})
export class WorkList {

  dataSource!: MatTableDataSource<Work>;
  readonly dialog = inject(MatDialog);

  constructor(public workStore: WorkStoreService) {
    this.dataSource = new MatTableDataSource();
    effect(() => {
      this.dataSource.data = this.workStore.works();
    });
  }

  columnsToDisplay: string[] = ['title', 'licenses', 'type', 'releaseDate', 'genres', 'artists', 'publishers', 'countries', 'lastSessionDate', 'moods'];
  columnsToDisplayWithExpand: string[] = [...this.columnsToDisplay, 'expand'];
  expandedElement!: Work | null;


  columnsInfo: Record<string, ColumnInfo> = {
    title: {
      label: "Titre",
      type: "titleFunction"
    },
    licenses: {
      label: "Série",
      type: "chipModule",
    },
    type: {
      label: "Type",
      type: "chipModule",
    },
    releaseDate: {
      label: "Date de sortie",
      type: "datePipe",
    },
    genres: {
      label: "Genres, thèmes",
      type: "chipModule",
    },
    artists: {
      label: "Artistes",
      type: "chipModule",
    },
    publishers: {
      label: "Éditeurs",
      type: "chipModule",
    },
    countries: {
      label: "Pays",
      type: "chipModule",
    },
    lastSessionDate: {
      label: "Dernière session",
      type: "datePipe",
    },
    moods: {
      label: "Ressentis",
      type: "chipModule",
    }
  }

  isExpanded(element: Work) {
    return element.expanded;
  }

  toggle(element: Work) {
    element.expanded = !element.expanded;
  }

  generalFilterValue: string = "";

  @ViewChild(MatSort) sort: MatSort | undefined;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  public displayWorkTitleAlias(titleAlias: string[]): string {
    return " (" + titleAlias.join(', ') + ")";
  }

  applyGeneralFilter() {
    // Attention, filtre géré par Angular Material, ne s'applique pas au système de chip géré par le service
    const filterValue = this.generalFilterValue;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  get activeFilters() {
    return computed(() =>
      Object.entries(this.workStore.filters()).flatMap(([field, values]) =>
        values.map(value => ({ field, value }))
      )
    );
  }

  removeFilter(field: string, value: string) {
    this.workStore.removeFilter(field, value);
  }

  expandAll() {
    this.workStore.expandAll();
  }

  reduceAll() {
    this.workStore.reduceAll();
  }

  openWorkForm() {
    const dialogRef = this.dialog.open(WorkForm, {
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == "update") this.workStore.loadWorks();
    });
  }

}
