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
import { WorkChips } from './work-chips/work-chips';

export type ColumnInfo = {
  label: string;
  type: 'titleFunction' | 'chipModule' | 'datePipe';
};

@Component({
  selector: 'app-work-list',
  imports: [MatCardModule, MatButtonModule, FormsModule, MatTableModule, MatSortModule, MatInputModule, MatFormFieldModule, MatIconModule,
    WorkChips, SessionList, PartialDatePipe],
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

  columnsToDisplay: string[] = ['title', 'licenses', 'type', 'releaseDate', 'genres', 'artists', 'publishers', 'lastSessionDate', 'moods'];
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

  public displayWorkTitle(work: Work): string {
    let string: string = work.title;
    if (work.titleAlias && work.titleAlias.length) string += " (" + work.titleAlias.join(', ') + ")";
    return string;
  }


  applyGeneralFilter() {
    // Attention, filtre géré par Angular Material, ne s'applique pas au système de chip géré par le service
    const filterValue = this.generalFilterValue;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
