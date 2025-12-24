import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { Work } from '../../../core/models/work.model';
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

  works: Work[] = [
    {
      id: 1,
      title: "Final Fantasy VII",
      titleAlias: ["Finaru Fantasy 7", "Méga super jeu"],
      type: "Jeu vidéo",
      licenses: ["Final Fantasy"],
      artists: ["Tetsuya Nomura", "Yoshitaka Amano", "Hironobu Sakaguchi", "Nobuo Ueematsu", "Yoshinori Kitase"],
      publishers: ["SquareEnix", "Squaresoft"],
      genres: ["JRPG", "Science-fiction"],
      releaseYear: 1997,
      sessions: []
    },
    {
      id: 3,
      title: "Kingdom Hearts",
      titleAlias: ["Finaru Fantasy 7", "Méga super jeu"],
      type: "Livre",
      licenses: ["Kingdom Hearts"],
      artists: ["Tetsuya Nomura", "Yoko Shimomura"],
      publishers: ["SquareEnix", "Squaresoft"],
      genres: ["JRPG", "Contes de fées"],
      releaseYear: 2002,
      lastSessionDate: "2024-12-09",
      sessions: [{
        date: "2024",
        moods: ["Chef-d'oeuvre", "Magnifique"],
        comment: "Je collectionne les porte-clés !",
        modalities: "Version Steam, Mod traduction FR",
        ended: "100% + contenu annexe"
      }]
    },
    {
      id: 2,
      title: "Final Fantasy VIII",
      titleAlias: ["Finaru Fantasy 7", "Méga super jeu"],
      type: "Jeu vidéo",
      licenses: ["Final Fantasy"],
      genres: ["JRPG", "Science-fiction"],
      artists: ["Tetsuya Nomura", "Yoshitaka Amano", "Hironobu Sakaguchi", "Nobuo Ueematsu", "Yoshinori Kitase"],
      publishers: ["SquareEnix", "Squaresoft"],
      releaseYear: 1998,
      lastSessionDate: "2022",
      sessions: [{
        date: "2024",
        moods: ["Chef-d'oeuvre", "Magnifique"],
        comment: "J'ai grave kiffé. Ce jeu est une perfection absolue, des personnages incroyables, des designs de fous, une histoire très en avance sur son temps qui a complètement révolutionné le JRPG, mais qui est encore très pertinente aujourd'hui.",
        modalities: "Version Steam, Mod traduction FR",
        ended: "100% + contenu annexe"
      }]
    }
  ]

  displayedColumns: string[] = ['title', 'licenses', 'type', 'releaseYear', 'genre', 'artists', 'lastSessionDate', 'moods'];
  dataSource = new MatTableDataSource(this.works);

  @ViewChild(MatSort) sort: MatSort | undefined;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }


  public displayFullArray(array: string[]): string {
    return array.join(", ")
  }

  public displayMoods(work: Work) {
    if (!work.sessions.length) return "";
    return this.displayFullArray(work.sessions[0].moods);
  }

  private convertDate(dateString: string): string {
    const splitted = dateString.split("-");
    let newDate: string = "";
    for (let i = 0; i < splitted.length; i++) newDate = newDate + splitted[splitted.length - 1 - i] + "/";
    return newDate.slice(0, -1);
  }

}
