import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environnements/environment';
import {Part} from "../model/part";

/**
 * Le service pour connecter aux APIs de gestion des classes.
 */
@Injectable({
  providedIn: 'root'
})
export class PartService {

  constructor(private http: HttpClient) { }

  enregistrerExam(part: Part
  ): Observable<Part> {
    return this.http.post(environment.enregistrerExam, part) as Observable<Part>;
  }

}
