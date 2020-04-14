import {Component, OnInit} from '@angular/core';
import {DudaService} from '../../shared/services/duda.service';
import {Duda} from '../../shared/models/duda';
import {Router} from '@angular/router';
import {TemaService} from '../../shared/services/tema.service';
import {Respuesta} from '../../shared/models/respuesta';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-lista-dudas',
  templateUrl: './lista-dudas.component.html',
  styleUrls: ['./lista-dudas.component.css']
})
export class ListaDudasComponent implements OnInit {

  public dudas: Duda[] = null;
  public duda: Duda = null;
  public searchform: FormGroup = null;
  public submitted = false;

  constructor(protected dudaService: DudaService, protected  temaService: TemaService, protected router: Router) {
    dudaService.getAllDudas().subscribe(d => {
      this.dudas = d;
    }, error => {
      router.navigate(['/']);
    });
  }

  public getTema(id: number): string {
    return this.temaService.getTemaById(id).Tema;
  }

  public showDuda(duda: Duda) {
    this.duda = duda;
  }

  ngOnInit(): void {
    this.searchform = new FormGroup({
      term: new FormControl(null, [Validators.required])
    });
  }

  deleteDuda(duda: Duda) {
    if (confirm('¿Seguro que deseas borrar esta duda? Se borrarán todas las respuestas asociadas')) {
      this.dudaService.borrar(duda).subscribe(() => {
        const index = this.dudas.indexOf(duda);
        if (index > -1) {
          this.dudas.splice(index, 1);
        }
      });
    }
  }

  public term(): AbstractControl {
    return this.searchform.get('term');
  }

  onSubmit() {
    if (this.searchform.valid) {
      this.submitted = true;
      this.dudaService.searchDudasByTerm(this.term().value).subscribe(d => {
        this.dudas = d;
      });
    }
  }

  resetSearch() {
    this.submitted = false;
    this.term().reset();
    this.dudaService.getAllDudas().subscribe(d => {
      this.dudas = d;
    });
  }
}
