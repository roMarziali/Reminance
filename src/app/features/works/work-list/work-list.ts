import { Component, ViewChild } from '@angular/core';
import { Work } from '../../../core/models/work.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-work-list',
  imports: [MatCardModule, MatButtonModule, MatTableModule, MatSortModule],
  templateUrl: './work-list.html',
  styleUrl: './work-list.scss',
})
export class WorkList {

  works: Work[] = [
    {
      id: 1,
      title: "Final Fantasy VII",
      type: "Jeu vidéo",
      licenses: ["Final Fantasy", "Mythic Quest"],
      artists: ["Tetsuya Nomura", "Yoshitaka Amano", "Hironobu Sakaguchi", "Nobuo Uematsu", "Yoshinori Kitase"],
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
      title: "Earthbound",
      titleAlias: ["Mother"],
      type: "Jeu vidéo",
      licenses: ["Final Fantasy"],
      genres: ["JRPG", "Science-fiction"],
      artists: ["Shigesato Itoi", "Yoshitaka Amano", "Hironobu Sakaguchi", "Nobuo Uematsu", "Yoshinori Kitase"],
      publishers: ["SquareEnix", "Squaresoft"],
      releaseYear: 1998,
      lastSessionDate: "2022",
      moods: ["Génial", "Pouet !"]
    }
  ]

  displayedColumns: string[] = ['title', 'licenses', 'type', 'releaseYear', 'genres', 'artists', 'publishers', 'lastSessionDate', 'moods', 'test'];
  dataSource = new MatTableDataSource(this.works);

  @ViewChild(MatSort) sort: MatSort | undefined;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }


  public displayFullArray(work: Work, param: 'titleAlias' | 'moods'|'licenses' | 'genres' | 'artists' | 'publishers'): string {
    if (!work[param] || !work[param].length)  return "";
    return work[param].join(", ")
  }

  public getLastSessionDate(work: Work): string {
    if (!work.lastSessionDate) return "";
    const splitted = work.lastSessionDate.split("-");
    let newDate: string = "";
    for (let i = 0; i < splitted.length; i++) newDate = newDate + splitted[splitted.length - 1 - i] + "/";
    return newDate.slice(0, -1);
  }

}
