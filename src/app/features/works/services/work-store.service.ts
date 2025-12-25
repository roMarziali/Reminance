import { computed, Injectable, signal } from "@angular/core";
import { Work } from "../../../core/models/work.model";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs";
import { environment } from "../../../../environments/environment";

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

  constructor(private http: HttpClient) {
    this.loadWorks();
  }

  loadWorks() {
    this.http.get<Work[]>(`${environment.apiUrl}/api/works/works`)
      .pipe(
        tap(data => {
          // on peut éventuellement transformer les données ici
          this._works.set(data);
        })
      )
      .subscribe({
        error: err => {
          console.error('Erreur lors du chargement des works', err);
        }
      });
  }

  expandAll() {
    this._works.update(works =>
      works.map(work => ({
        ...work,
        expanded: true,
      }))
    );
  }

  get filters() {
    return this._filters
  }

  addFilter(field: string, value: string) {
    this._filters.update(f => {
      const current = f[field] ?? [];
      if (current.includes(value)) {
        return f;
      }

      return {
        ...f,
        [field]: [...current, value],
      };
    });
  }

  removeFilter(field: string, value: string) {
    this._filters.update(f => {
      const values = (f[field] ?? []).filter(v => v !== value);

      if (values.length === 0) {
        const { [field]: _, ...rest } = f;
        return rest;
      }

      return {
        ...f,
        [field]: values,
      };
    });
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
