import { Component, OnInit, ViewChild } from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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
import {Subject, Subscription} from 'rxjs';
import {environment} from "../../environnements/environment";
import {Exam} from "../../model/exam";
import {ExamService} from "../../service/exam.service";
import {Matiere} from "../../model/matiere";
import {MatiereService} from "../../service/matiere.service";
import {Part} from "../../model/part";
import {PartService} from "../../service/part.service";

@Component({
  selector: 'app-detail-classe',
  standalone: true,
  imports: [MaterialModule],
  providers: [ClasseService, EtudiantService],
  templateUrl: './detail-exam.component.html',
  styleUrl: './detail-exam.component.css'
})
export class DetailExamComponent implements OnInit {
  exam!: Exam;
  part!: Part;
  classeFormGroup!: FormGroup;
  partFormGroup!: FormGroup;
  classeList: Classe[] = [];
  matiereList: Matiere[] = [];
  nomCtrlForm!: FormControl;
  displayedColumns: string[] = ['id', 'grade'];
  etudiantsList : Etudiant[] = [];
  dataSourceEtudiants = new MatTableDataSource<Etudiant>();
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  selection = new SelectionModel<Etudiant>(true, []);
  private subscriptionExamAModifier!: Subscription;
  partFormControl!: FormControl;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private classeService: ClasseService,
    private etudiantService: EtudiantService,
    private matiereService: MatiereService,
    private examService: ExamService,
    private partService: PartService,
    private modificationService: ModificationService, private http: HttpClient
  ) { }



  ngOnInit(): void {
    this.initExam();
    this.initClasseList();
    this.initMatiereList();
    this.initEtudiantList();
    this.initFormControl();
  }

  ngOnDestroy() {
    this.subscriptionExamAModifier.unsubscribe();
  }

  /**
   * Cette méthode s'abonner au service de modification pour initialiser la classe.
   */
  private initExam(): void {
    this.subscriptionExamAModifier = this.modificationService.objet$.subscribe(
      (examAModifier: Exam) => {
        this.exam = examAModifier;
      });
  }

  /**
   * Initialiser des controles sur le formulaire.
   */
  private initFormControl(): void {
    this.nomCtrlForm = this.formBuilder.control(
      this.exam,
      [Validators.required, Validators.maxLength(100)]
    );
    this.classeFormGroup = this.formBuilder.group({
      nom: this.nomCtrlForm,
    });
  }
  /**
   * Si tous les checkbox sont sélectionnés.
   * @returns
   */

  private initClasseList(): void {
    this.classeService.rechercherClasses().subscribe({
      next: value => this.classeList = value,
      error: err => console.error(err)
    });
  }

  private initMatiereList(): void {
    this.matiereService.rechercherMatieres().subscribe({
      next: value => this.matiereList = value,
      error: err => console.error(err)
    });
  }

  private initEtudiantList(): void {
    this.etudiantService.rechercherEtudiants().subscribe({
      next: value => this.etudiantsList = value,
      error: err => console.error(err)
    });
  }

  enregistrer(): void {
    if (this.classeFormGroup.valid) {
      this.examService.enregistrerExam(this.exam).subscribe({
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
