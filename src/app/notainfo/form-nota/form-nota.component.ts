import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {NotaService} from '../../shared/services/nota.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Nota} from '../../shared/models/nota';
import {Usuario} from '../../shared/models/usuario';
import {UsuarioService} from '../../shared/services/usuario.service';

@Component({
  selector: 'app-form-nota',
  templateUrl: './form-nota.component.html',
  styleUrls: ['./form-nota.component.css']
})
export class FormNotaComponent implements OnInit {
  public formulario: FormGroup;
  nota: Nota = new Nota();
  Usuario: Usuario;

  constructor(protected notaservice: NotaService, protected router: Router, protected route: ActivatedRoute,
              protected usuarioService: UsuarioService) {
  }

  ngOnInit(): void {
    this.formulario = new FormGroup({
      titulo: new FormControl(null, [Validators.required, Validators.maxLength(255)]),
      cuerpo: new FormControl(null, [Validators.required, Validators.maxLength(255)]),
    });
  }

  public titulo(): AbstractControl {
    return this.formulario.get('titulo');
  }

  public cuerpo(): AbstractControl {
    return this.formulario.get('cuerpo');
  }

  onSubmit() {
    this.nota.Titulo = this.titulo().value;
    this.nota.Cuerpo = this.cuerpo().value;
    this.nota.Fecha = new Date();
    this.nota.UsuarioAdministrador_oid = this.usuarioService.obtenerUsuarioActual();

    this.notaservice.crear(this.nota).subscribe(id => {
        console.log(this.nota);
        this.router.navigate(['/nota']);
      });
  }
}

