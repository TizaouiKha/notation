import { Routes } from '@angular/router';
import {ResultatDevoirComponent} from "./components/resultat-devoir/resultat-devoir.component";
import {ResultatClasseComponent} from "./components/resultat-classe/resultat-classe.component";
import {ResultatEtudiantComponent} from "./components/resultat-etudiant/resultat-etudiant.component";
import {ResultatMatiereComponent} from "./components/resultat-matiere/resultat-matiere.component";
import {DetailClasseComponent} from "./components/detail-classe/detail-classe.component";
import {DetailEtudiantComponent} from "./components/detail-etudiant/detail-etudiant.component";
import {DetailMatiereComponent} from "./components/detail-matiere/detail-matiere.component";
import {DetailDevoirComponent} from "./components/detail-devoir/detail-devoir.component";
import {AccueilComponent} from "./components/accueil/accueil.component";
import {ResultatNotation} from "./components/resultat-notation/resultat-notation";
import {DetailNotationComponent} from "./components/detail-notation/detail-notation.component";


export const routes: Routes = [

  { path: '', component: ResultatNotation, },
  { path: 'devoir', component: ResultatDevoirComponent, },
  { path: 'classes', component: ResultatClasseComponent },
  { path: 'etudiants', component: ResultatEtudiantComponent },
  { path: 'matieres', component: ResultatMatiereComponent },
  { path: 'detail-classe', component: DetailClasseComponent },
  { path: 'detail-etudiant', component: DetailEtudiantComponent },
  { path: 'detail-matiere', component: DetailMatiereComponent },
  { path: 'detail-devoir', component: DetailDevoirComponent },
  { path: 'detail-notation', component: DetailNotationComponent },


];
