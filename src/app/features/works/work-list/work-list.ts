import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { WorkSummary } from '../../../core/models/work-summary';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-work-list',
  imports: [MatCardModule, MatButtonModule, MatTableModule, MatSortModule],
  templateUrl: './work-list.html',
  styleUrl: './work-list.scss',
})
export class WorkList {

  works: WorkSummary[] = [
    {
      id: 1,
      title: "Final Fantasy VII",
      type: "Jeu vidéo",
      licenses: ["Final Fantasy", "Mythic Quest"],
      artists: ["Tetsuya Nomura", "Yoshitaka Amano", "Hironobu Sakaguchi", "Nobuo Ueematsu", "Yoshinori Kitase"],
      publishers: ["SquareEnix", "Squaresoft"],
      genres: ["JRPG", "Science-fiction"],
      releaseYear: 1997,
      moods: ["Génial", "Emouvant !"]
    },
    {
      id: 3,
      title: "Kingdom Hearts",
      type: "Livre",
      licenses: ["Kingdom Hearts"],
      artists: ["Tetsuya Nomura", "Yoko Shimomura"],
      publishers: ["SquareEnix", "Squaresoft"],
      genres: ["JRPG", "Contes de fées"],
      releaseYear: 2002,
      lastSessionDate: "2024-12-09",
    },
    {
      id: 2,
      title: "Earthbound (Mother)",
      type: "Jeu vidéo",
      licenses: ["Final Fantasy"],
      genres: ["JRPG", "Science-fiction"],
      artists: ["Tetsuya Nomura", "Yoshitaka Amano", "Hironobu Sakaguchi", "Nobuo Ueematsu", "Yoshinori Kitase"],
      publishers: ["SquareEnix", "Squaresoft"],
      releaseYear: 1998,
      lastSessionDate: "2022",
      moods: ["Génial", "Pouet !"]
    }
  ]

  displayedColumns: string[] = ['title', 'licenses', 'type', 'releaseYear', 'genres', 'artists', 'lastSessionDate', 'moods'];
  dataSource = new MatTableDataSource(this.works);

  @ViewChild(MatSort) sort: MatSort | undefined;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }


  public displayFullArray(array: string[]): string {
    return array.join(", ")
  }

  public displayMoods(work: WorkSummary) {
    if (!work.moods || !work.moods.length) return "";
    return this.displayFullArray(work.moods);
  }

  public getLastSessionDate(work: WorkSummary): string {
    if (!work.lastSessionDate) return "";
    const splitted = work.lastSessionDate.split("-");
    let newDate: string = "";
    for (let i = 0; i < splitted.length; i++) newDate = newDate + splitted[splitted.length - 1 - i] + "/";
    return newDate.slice(0, -1);
  }

}
