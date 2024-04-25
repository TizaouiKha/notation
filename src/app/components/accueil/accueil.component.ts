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
import {PartService} from "../../service/part.service";
import {Part} from "../../model/part";


@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [MaterialModule, HttpClientModule, RouterLink],
  providers: [ExamService],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent implements OnInit {
  displayedColumns: string[] = ['id', 'grade','name','idExam'];
  dataSource = new MatTableDataSource<any>();
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
    private partService: PartService,
    private modificationService: ModificationService,
    private examService: ExamService) {
  }
  ngOnInit(): void {
    this.initPartList();
    this.dataSource.paginator = this.paginator;
  }

  ajouterPart(): void {
    this.modificationService.envoyerObjetACreerOuModifier(null);
    // this.router.navigateByUrl('detail-devoir');
  }

  /**
   * Initialiser la liste de tous les clases
   */
  private initPartList(): void {
    this.partService.rechercherParts().subscribe({
      next: res=>{
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
  modifierExam(partAModifier: Part): void {
    this.modificationService.envoyerObjetACreerOuModifier(partAModifier);
    // this.router.navigateByUrl('detail-exam');
  }

  /**
   * Action de suppression d'un examen.
   */
  // supprimerExam(id: number): void {
  //   this.examService.supprimerExam(id).subscribe({
  //     next: () => {
  //       this.dataSource.data = this.dataSource.data.filter(item => item.id !== id);
  //     },
  //     error: err => console.error('Erreur de suppression: ', err)
  //   });
  // }
}


