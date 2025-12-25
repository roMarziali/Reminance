import { computed, Injectable, signal } from "@angular/core";
import { Work } from "../../../core/models/work.model";

@Injectable({ providedIn: 'root' })
export class WorkStoreService {
  private _works = signal<Work[]>([]);
  private _filters = signal<Record<string, string[]>>({});

  works = computed(() =>
    this._works().filter(work =>
      Object.entries(this._filters()).every(
        ([key, values]) =>
          !values.length || values.some(v => (work as any)[key]?.includes(v))
      )
    )
  );

  constructor() {
    this.loadWorks();
  }

  private loadWorks() {
    const data: Work[] = [
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
          comment: `Lordsdso.`,
          modalities: "Version NES sous émulateur, VO",
          ended: "Y",
          endedPrecision: "100% + quêtes annexes !"
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
    ];

    this._works.set(data);
  }

  addFilter(field: string, value: string) {
    this._filters.update(f => ({
      ...f,
      [field]: [...(f[field] ?? []), value]
    }));
  }

  //test toremove
  // add(){
  //   this._works.update( works => [
  //     ... works, {
  //       id: 2,
  //       title: "Earthbound",
  //       titleAlias: ["Mother"],
  //       type: "Jeu vidéo",
  //       licenses: ["Final Fantasy"],
  //       genres: ["JRPG", "Science-fiction"],
  //       artists: ["Shigesato Itoi", "Yoshitaka Amano", "Hironobu Sakaguchi", "Nobuo Uematsu", "Yoshinori Kitase"],
  //       publishers: ["SquareEnix", "Squaresoft"],
  //       releaseDate: "1998",
  //       lastSessionDate: "2022",
  //       moods: ["Génial", "Pouet !"]
  //     }]);
  // }
}
