import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environnements/environment';
import {Exam} from "../model/exam";

/**
 * Le service pour connecter aux APIs de gestion des classes.
 */
@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(private http: HttpClient) { }

  rechercherExam(
  ): Observable<Exam[]> {
    return this.http.get(environment.rechercherExam) as Observable<Exam[]>;
  }

  supprimerExam(examId: number
  ): Observable<HttpResponse<string>> {
    let paramList: HttpParams = new HttpParams();
    paramList = paramList.set('id', examId);
    return this.http.delete(environment.supprimerExam, {
      params: paramList,
    }) as Observable<HttpResponse<string>>;
  }


  enregistrerExam(exam: Exam
  ): Observable<Exam> {
    return this.http.post(environment.enregistrerExam, exam) as Observable<Exam>;
  }

  modifierExam(exam: Exam): Observable<Exam>{
    return this.http.post(environment.modifierExam, exam) as Observable<Exam>;
  }
}
