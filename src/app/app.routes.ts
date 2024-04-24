import { Routes } from '@angular/router';
import {AccueilComponent} from "./components/accueil/accueil.component";
import {ResultatClasseComponent} from "./components/resultat-classe/resultat-classe.component";
import {ResultatEtudiantComponent} from "./components/resultat-etudiant/resultat-etudiant.component";
import {ResultatMatiereComponent} from "./components/resultat-matiere/resultat-matiere.component";
import {DetailClasseComponent} from "./components/detail-classe/detail-classe.component";
import {DetailEtudiantComponent} from "./components/detail-etudiant/detail-etudiant.component";
import {DetailMatiereComponent} from "./components/detail-matiere/detail-matiere.component";

export const routes: Routes = [
  { path: '', component: AccueilComponent, },
  { path: 'classes', component: ResultatClasseComponent },
  { path: 'etudiants', component: ResultatEtudiantComponent },
  { path: 'matieres', component: ResultatMatiereComponent },
  { path: 'detail-classe', component: DetailClasseComponent },
  { path: 'detail-etudiant', component: DetailEtudiantComponent },
  { path: 'detail-matiere', component: DetailMatiereComponent },

];
