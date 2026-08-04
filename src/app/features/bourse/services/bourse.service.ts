import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Stock } from "../../../core/models/stock.model";
import { environment } from "../../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class BourseService {

  constructor(private http: HttpClient) { }

  getCacLarge60(): Observable<Stock[]> {
    return this.http.get<Stock[]>(`${environment.apiUrl}/api/bourse/cac-large-60`);
  }

  getSp500(): Observable<Stock[]> {
    return this.http.get<Stock[]>(`${environment.apiUrl}/api/bourse/sp-500`);
  }
}
