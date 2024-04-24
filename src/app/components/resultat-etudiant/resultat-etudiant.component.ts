import { Component, OnInit, ViewChild } from '@angular/core';
import { MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions } from '@angular/material/tooltip';
import { Etudiant } from '../../model/etudiant';
import { EtudiantService } from '../../service/etudiant.service';
import { MaterialModule } from '../../shared/material-module';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink, Router } from '@angular/router';
import { ModificationService } from '../../service/modification.service';
import {ClasseService} from "../../service/classe.service";

export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 1000,
  hideDelay: 1000,
  touchendHideDelay: 1000,
};

@Component({
  selector: 'app-resultat-etudiant',
  standalone: true,
  imports: [MaterialModule, HttpClientModule, RouterLink
  ],
  providers: [EtudiantService, { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults }],
  templateUrl: './resultat-etudiant.component.html',
  styleUrl: './resultat-etudiant.component.css'
})
export class ResultatEtudiantComponent implements OnInit {
  constructor(
    private router: Router,
    private etudiantService: EtudiantService,
    private classeService: ClasseService,
    private modificationService: ModificationService
  ) { }

  displayedColumns: string[] = ['id', 'lastName', 'firstName', 'idClass', 'picture'];
  nomClassMap: Map<number, string> = new Map([]);
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

  ngOnInit(): void {
    this.initEtudiantList();
  }

  /**
   * Initialiser la liste de tous les étudiants
   */
  initEtudiantList(): void {
    this.classeService.rechercherClasses().subscribe({
      next: res => {
        for(let i = 0; i< res.length; i++){
          this.nomClassMap.set(<number>res[i].id, <string>res[i].name)
        }
      },
      error: err => console.error(err)
    })
    this.etudiantService.rechercherEtudiants().subscribe({
      next: res => {
        for(let i = 0; i< res.length; i++){
          let classname = this.nomClassMap.get(res[i].idClass);
          res[i].idClass = classname;
        }
        this.dataSource.data = res;
      },
      error: err => console.error(err)
    });
    this.dataSource.paginator = this.paginator;
  }

  /**
    * Action d'ajout d'un étudiant.
    * Elle émet un message pour les abbonnés avec un étudiant vide.
    */
  ajouterEtudiant(): void {
    this.modificationService.envoyerObjetACreerOuModifier(null);
    this.router.navigateByUrl('detail-etudiant');
  }

  /**
    * Action de modification d'un étudiant.
    * Elle émet un message pour les abbonnés, l'étudiant sélectionné.
    */
  modifierEtudiant(etudiant: Etudiant): void {
    this.modificationService.envoyerObjetACreerOuModifier(etudiant);
    this.router.navigateByUrl('detail-etudiant');
  }

  /**
    * Action de suppression d'un étudiant.
    */
  supprimerEtudiant(id: number): void {
    this.etudiantService.supprimerEtudiant(id).subscribe({
      next: () => {
        this.dataSource.data = this.dataSource.data.filter(item => item.id !== id);
      },
      error: err => console.error(err)
    });
  }
}
