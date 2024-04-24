import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MaterialModule } from '../../shared/material-module';
import { Router, RouterLink } from '@angular/router';
import { Classe } from '../../model/classe';
import { ExamService } from '../../service/exam.service';
import { HttpClientModule } from '@angular/common/http';
import { ModificationService } from '../../service/modification.service';


@Component({
  selector: 'app-resultat-exam',
  standalone: true,
  imports: [MaterialModule, HttpClientModule, RouterLink],
  providers: [ExamService],
  templateUrl: './resultat-exam.component.html',
  styleUrl: './resultat-exam.component.css'
})
export class ResultatExamComponent implements OnInit {
  displayedColumns: string[] = ['id', 'type','date','coefficient','number_part','id_subject','id_classe','id_student','points'];
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
    private examService: ExamService,
    private modificationService: ModificationService) {
  }
  ngOnInit(): void {
    this.initExamList();
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Initialiser la liste de tous les clases
   */
  private initExamList(): void {
    this.examService.rechercherExam().subscribe({
      next: value => this.dataSource.data = value,
      error: err => console.error(err)
    });
  }

  /**
    * Action d'ajout d'une classe.
    * Elle émet un message pour les abbonnés avec une classe vide.
    */
  ajouterExam(): void {
    this.modificationService.envoyerObjetACreerOuModifier(null);
    this.router.navigateByUrl('detail-exam');
  }

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


