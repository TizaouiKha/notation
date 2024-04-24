import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Etudiant } from '../model/etudiant';
import { environment } from '../environnements/environment';
import {Matiere} from "../model/matiere";


/**
 * Le service pour connecter aux APIs de gestion des classes.
 */
@Injectable({
  providedIn: 'root'
})
export class MatiereService {

  constructor(private http: HttpClient) { }

  rechercherMatieres(
  ): Observable<Matiere[]> {
    return this.http.get(environment.rechercherMatieres) as Observable<Etudiant[]>;
  }


  enregistrerMatiere(matiere: Matiere
  ): Observable<Matiere> {
    return this.http.post(environment.enregistrerMatiere, matiere) as Observable<Etudiant>;
  }

  supprimerMatiere(matiereId: number
  ): Observable<HttpResponse<string>> {
    let paramList: HttpParams = new HttpParams();
    paramList = paramList.set('id', matiereId);
    return this.http.delete(environment.supprimerMatiere, {
      params: paramList,
    }) as Observable<HttpResponse<string>>;
  }
}
