import { Component, ViewChild } from '@angular/core';
import { Work } from '../../../core/models/work.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SessionList } from './session-list/session-list';
import { PartialDatePipe } from '../../../shared/pipes/partial-date.pipe';

@Component({
  selector: 'app-work-list',
  imports: [MatCardModule, MatButtonModule, MatTableModule, MatSortModule, SessionList, PartialDatePipe],
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
      publishers: ["Nintendo"],
      genres: ["JRPG", "Science-fiction"],
      releaseDate: "1997",
      moods: ["Génial", "Emouvant !"],
      sessions: [{
        id: 1,
        date: '2024-05',
        moods: ["Incroyable !", "Personnages charismatiques"],
        comment: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui ad quis esse unde eius. Consectetur vitae labore
          facere laudantium expedita adipisci cum! Nobis assumenda aut, corrupti in eum et illum?
          Sit adipisci nemo tempore nam quaerat soluta eum, consequuntur sint ab fugiat porro suscipit iure enim atque
          facilis placeat laudantium vero totam asperiores omnis necessitatibus saepe? Dignissimos perferendis vel quos.
          Nisi ex quas hic corporis provident fugit sapiente laboriosam distinctio. Sapiente quidem harum reprehenderit
          maxime, natus eum libero nemo dolorum quo nostrum qui at iure aliquid ex accusamus quis laboriosam.
          Sit expedita id, deleniti quibusdam sequi suscipit aut nulla cum, tempora voluptatibus nesciunt! Ipsa
          repudiandae quisquam ab corporis quae totam dolores doloremque similique quo et esse cumque optio, laboriosam
          vel?
          Sunt explicabo laboriosam commodi quia dolor earum provident qui perferendis repellendus sed, quis optio
          corporis quidem eius reiciendis aperiam minima facilis esse! Fugiat ut optio debitis magnam hic quidem
          consequuntur!
          Fugiat illum nobis reiciendis hic eius non labore voluptatem, molestiae aspernatur eum, suscipit quae a
          laboriosam perferendis vero minus. Accusantium amet atque at animi error nulla, ab tempora! Ducimus,
          consequatur!
          Nam animi distinctio error sapiente repudiandae, eius sed maiores illo accusantium ipsam possimus quas
          dignissimos, aliquid rem eos nostrum nobis tempora pariatur, modi accusamus dolorem a id voluptate reiciendis.
          Illo.`,
        modalities: "Version NES sous émulateur, VO",
        ended: "100% + quêtes annexes !"
      }]
    },
    {
      id: 3,
      title: "Kingdom Hearts",
      type: "Livre",
      licenses: ["Kingdom Hearts"],
      artists: ["Tetsuya Nomura", "Yoko Shimomura"],
      publishers: ["SquareEnix", "Squaresoft"],
      genres: ["JRPG", "Contes de fées"],
      releaseDate: "2002-12",
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
      releaseDate: "1998",
      lastSessionDate: "2022",
      moods: ["Génial", "Pouet !"]
    }
  ]

  displayedColumns: string[] = ['title', 'licenses', 'type', 'releaseDate', 'genres', 'artists', 'publishers', 'lastSessionDate', 'moods', 'sessions'];
  dataSource = new MatTableDataSource(this.works);

  @ViewChild(MatSort) sort: MatSort | undefined;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }


  public displayFullArray(work: Work, param: 'titleAlias' | 'moods' | 'licenses' | 'genres' | 'artists' | 'publishers'): string {
    if (!work[param] || !work[param].length) return "";
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
