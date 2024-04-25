import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MaterialModule } from '../../shared/material-module';
import { Router, RouterLink } from '@angular/router';
import { Classe } from '../../model/classe';
import { ExamService } from '../../service/exam.service';
import { HttpClientModule } from '@angular/common/http';
import { ModificationService } from '../../service/modification.service';
import {MatiereService} from "../../service/matiere.service";
import {Matiere} from "../../model/matiere";
import {animate} from "@angular/animations";
import {ClasseService} from "../../service/classe.service";
import {EtudiantService} from "../../service/etudiant.service";


@Component({
  selector: 'app-resultat-devoir',
  standalone: true,
  imports: [MaterialModule, HttpClientModule, RouterLink],
  providers: [ExamService],
  templateUrl: './resultat-devoir.component.html',
  styleUrl: './resultat-devoir.component.css'
})
export class ResultatDevoirComponent implements OnInit {
  displayedColumns: string[] = ['id', 'type','date','coefficient','numberPart','idSubject','idClass','idStudent','points'];
  dataSource = new MatTableDataSource<any>();
  nomMatiereMap: Map<number, string> = new Map([]);
  nomClassMap: Map<number, string> = new Map([]);
  nomEtudiantMap: Map<number, string> = new Map([]);

  @ViewChild(MatPaginator) set paginator(pager: MatPaginator) {
    if (pager) {
      this.dataSource.paginator = pager;
      this.dataSource.paginator._intl = new MatPaginatorIntl();
      this.dataSource.paginator._intl.itemsPerPageLabel = `Total : ${this.dataSource.data.length} - Éléments par page`;
      this.dataSource.paginator._intl.getRangeLabel = function (
        page,
        pageSize,
        length
      ) {
        if (length === 0) {
          return 'Page 1 sur 1';
        }
        const amountPages = Math.ceil(length / pageSize);
        return `Page ${page + 1} sur ${amountPages}`;
      };
    }
  }
  constructor(
    private router: Router,
    private examService: ExamService,
    private matiereService: MatiereService,
    private modificationService: ModificationService,
    private etudiantService: EtudiantService,
    private classeService: ClasseService) {
  }
  ngOnInit(): void {
    this.initExamList();
    this.dataSource.paginator = this.paginator;
  }

  ajouterDevoir(): void {
    this.modificationService.envoyerObjetACreerOuModifier(null);
    this.router.navigateByUrl('detail-devoir');
  }

  /**
   * Initialiser la liste de tous les clases
   */
  private initExamList(): void {
    this.matiereService.rechercherMatieres().subscribe(
      {
        next: res=>{
          for(let i = 0; i< res.length; i++){
            this.nomMatiereMap.set(<number>res[i].id, <string>res[i].subject)
          }
        }
      }
    )
    this.etudiantService.rechercherEtudiants().subscribe(
      {
        next: res=>{
          for(let i = 0; i< res.length; i++){
            this.nomEtudiantMap.set(<number>res[i].id, <string>res[i].lastName)
          }
        }
      }
    )
    this.classeService.rechercherClasses().subscribe({
      next: res => {
        for(let i = 0; i< res.length; i++){
          this.nomClassMap.set(<number>res[i].id, <string>res[i].name)
        }
      },
      error: err => console.error(err)
    })
    this.examService.rechercherExam().subscribe({
      next: res => {
        for(let i = 0; i< res.length; i++){
          let matiereName = this.nomMatiereMap.get(res[i].idSubject);
          let nomClasse = this.nomClassMap.get(res[i].idClass);
          let nomEtudiant = this.nomEtudiantMap.get(res[i].idStudent);
          res[i].idSubject = matiereName;
          res[i].idClass = nomClasse;
          res[i].idStudent = nomEtudiant;
          }
        this.dataSource.data = res;

      },
      error: err => console.error(err)
    });
    console.log(this.dataSource);
  }

  /**
   * Action d'ajout d'une classe.
   * Elle émet un message pour les abbonnés avec une classe vide.
   */


  /**
   * Action de modification d'un examen.
   * Elle émet un message pour les abbonnés, l'examen sélectionnée.
   */
  modifierExam(ExamAModifier: Classe): void {
    this.modificationService.envoyerObjetACreerOuModifier(ExamAModifier);
    this.router.navigateByUrl('detail-exam');
  }

  /**
   * Action de suppression d'un examen.
   */
  supprimerExam(id: number): void {
    this.examService.supprimerExam(id).subscribe({
      next: () => {
        this.dataSource.data = this.dataSource.data.filter(item => item.id !== id);
      },
      error: err => console.error('Erreur de suppression: ', err)
    });
  }
}


