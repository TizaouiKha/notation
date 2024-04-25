import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClasseService } from '../../service/classe.service';
import { EtudiantService } from '../../service/etudiant.service';
import { Etudiant } from '../../model/etudiant';
import { Classe } from '../../model/classe';
import { MaterialModule } from '../../shared/material-module';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { ModificationService } from '../../service/modification.service';
import { Subscription } from 'rxjs';
import {environment} from "../../environnements/environment";
import {Matiere} from "../../model/matiere";
import {MatiereService} from "../../service/matiere.service";
import {Part} from "../../model/part";
import {PartService} from "../../service/part.service";

@Component({
  selector: 'app-detail-classe',
  standalone: true,
  imports: [MaterialModule],
  providers: [ClasseService, EtudiantService],
  templateUrl: './detail-notation.component.html',
  styleUrl: './detail-notation.component.css'
})
export class DetailNotationComponent implements OnInit {
  part!: Part;
  partFormGroup!: FormGroup;
  nomCtrlForm!: FormControl;
  displayedColumns: string[] = ['id', 'grade', 'name', 'idExam'];
  dataSourceMatieres = new MatTableDataSource<Part>();
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  private subscriptionPartAModifier!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private partService: PartService,
    private modificationService: ModificationService, private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.initMatieres();
    this.initFormControl();
  }

  ngOnDestroy() {
    this.subscriptionPartAModifier.unsubscribe();
  }

  /**
   * Cette méthode s'abonner au service de modification pour initialiser la classe.
   */
  private initMatieres(): void {
    this.subscriptionPartAModifier = this.modificationService.objet$.subscribe(
      (partAModifier: Part) => {
        this.part = partAModifier;
      });
  }

  /**
   * Initialiser des controles sur le formulaire.
   */
  private initFormControl(): void {
    this.nomCtrlForm = this.formBuilder.control(
      this.part.grade,
      [Validators.required, Validators.maxLength(100)]
    );
    this.partFormGroup = this.formBuilder.group({
      nom: this.nomCtrlForm
    });
  }
  /**
   * Si tous les checkbox sont sélectionnés.
   * @returns
   */

  /**
   * action du bouton de "Sélectionner/déselectionner" tous les étudiants
   */

  /**
   * Enregistrer la classe.
   */
  enregistrer(): void {
    if (this.partFormGroup.valid) {
      this.partService.enregistrerPart(this.part).subscribe({
        next: value => {
          this.router.navigateByUrl('');
        },
        error: err => console.error(err)
      });
    }
  }
  /**
   * Récupérer le message d'erreur en fonction de validateur.
   * @param ctrl le formcontrol
   * @returns
   */
  getMessageErreur(ctrl: AbstractControl): string {
    if (!ctrl) {
      return "";
    }
    if (ctrl.hasError('required')) {
      return 'Champs obligatoire';
    } else if (ctrl.hasError('maxlength')) {
      return (
        'Champs de caractère maximum ' +
        ctrl.getError('maxlength').requiredLength
      );
    }
    return "";
  }

  /**
   * Initialiser la liste des étudiants de la classe ou à ajouter dans la classe.
   */
}
