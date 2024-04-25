import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environnements/environment';
import {Part} from "../model/part";
import {Matiere} from "../model/matiere";

/**
 * Le service pour connecter aux APIs de gestion des classes.
 */
@Injectable({
  providedIn: 'root'
})
export class PartService {

  constructor(private http: HttpClient) { }

  enregistrerPart(part: Part
  ): Observable<Part> {
    return this.http.post(environment.enregistrerPart, part) as Observable<Part>;
  }

  rechercherParts(): Observable<Part[]> {
    return this.http.get(environment.rechercherParts) as Observable<Part[]>;
  }

}
