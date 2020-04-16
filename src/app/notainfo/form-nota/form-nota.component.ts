import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NotaService} from '../../shared/services/nota.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Nota} from '../../shared/models/nota';
import {Usuario} from '../../shared/models/usuario';

@Component({
  selector: 'app-form-nota',
  templateUrl: './form-nota.component.html',
  styleUrls: ['./form-nota.component.css']
})
export class FormNotaComponent implements OnInit {
  public formulario: FormGroup;
  Nota: Nota;
  Notas: Nota[];
  Usuario: Usuario;
  check: boolean;

  constructor(protected notaservice: NotaService, protected router: Router, protected route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.formulario = new FormGroup({
      titulo: new FormControl(null, [Validators.required, Validators.maxLength(255)]),
      cuerpo: new FormControl(null, [Validators.required, Validators.maxLength(255)]),
    });
  }

  onSubmit() {
    console.log(this.formulario);
      this.Nota.Titulo = this.formulario.get('titulo').value;
      this.Nota.Cuerpo = this.formulario.get('cuerpo').value;

      if (this.check) {
        this.notaservice.modificar(this.Nota).subscribe(d => {
          this.router.navigate(['/nota']);
        });
      } else {
        this.Nota.UsuarioAdministrador_oid = 32768;
        this.notaservice.crear(this.Nota).subscribe(id => {
          this.router.navigate(['/nota']);
        });
      }

  }
}

