import {Component, OnInit, ViewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from "@angular/material/table";
import {MatFabButton, MatMiniFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatPaginator, MatPaginatorIntl} from "@angular/material/paginator";
import {MatTooltip} from "@angular/material/tooltip";
import {Router} from "@angular/router";
import {ModificationService} from "../../service/modification.service";
import {Classe} from "../../model/classe";
import {MatiereService} from "../../service/matiere.service";
import {Matiere} from "../../model/matiere";

@Component({
  selector: 'app-resultat-matiere',
  standalone: true,
  imports: [
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatFabButton,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatMiniFabButton,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatTable,
    MatTooltip,
    MatHeaderCellDef
  ],
  templateUrl: './resultat-matiere.component.html',
  styleUrl: './resultat-matiere.component.css'
})
export class ResultatMatiereComponent implements OnInit{
  displayedColumns: string[] = ['id', 'subject'];
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
    private matiereService: MatiereService,
    private modificationService: ModificationService) {
  }
  ngOnInit(): void {
    this.initClasseList();
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Initialiser la liste de tous les clases
   */
  private initClasseList(): void {
    this.matiereService.rechercherMatieres().subscribe({
      next: value => this.dataSource.data = value,
      error: err => console.error(err)
    });
    console.log(this.dataSource);
  }

  /**
   * Action d'ajout d'une classe.
   * Elle émet un message pour les abbonnés avec une classe vide.
   */
  ajouterMatiere(): void {
    this.modificationService.envoyerObjetACreerOuModifier({});
    this.router.navigateByUrl('detail-matiere');
  }

  /**
   * Action de modification d'une classe.
   * Elle émet un message pour les abbonnés, la classe sélectionnée.
   */
  modifierMatiere(matiereAModifier: Matiere): void {
    this.modificationService.envoyerObjetACreerOuModifier(matiereAModifier);
    this.router.navigateByUrl('detail-matiere');
  }

  /**
   * Action de suppression d'une classe.
   */
  supprimerMatiere(id: number): void {
    this.matiereService.supprimerMatiere(id).subscribe({
      next: () => {
        this.dataSource.data = this.dataSource.data.filter(item => item.id !== id);
      },
      error: err => console.error('Erreur de suppression: ', err)
    });
  }

}

