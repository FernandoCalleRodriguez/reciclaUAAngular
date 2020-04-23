import {Component, Input, OnInit} from '@angular/core';
import {Usuario} from '../../shared/models/usuario';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {UsuarioService} from '../../shared/services/usuario.service';
import {Nota} from '../../shared/models/nota';
import {Observable} from 'rxjs';
import {NotaService} from '../../shared/services/nota.service';
import {AutenticacionService} from '../../shared/services/autenticacion.service';

@Component({
  selector: 'app-modal-nota',
  templateUrl: './modal-nota.component.html',
  styleUrls: ['./modal-nota.component.css']
})
export class ModalNotaComponent implements OnInit {
  public formulario: FormGroup;
  public user: Usuario = new Usuario();
  public nota: Nota = new Nota();
  public edit = false;

  @Input('IdNota')
  public Id: number;

  constructor(protected notaService: NotaService, protected usuarioService: UsuarioService,
              protected  autenticationService: AutenticacionService) {
    this.autenticationService.estaAutenticado();
    this.usuarioService.getLoggedUser().subscribe(u => {
      this.nota.UsuarioAdministrador_oid = u.Id;
    });
  }

  ngOnInit(): void {
    this.formulario = new FormGroup({
      titulo: new FormControl(null, [Validators.required]),
      cuerpo: new FormControl(null, [Validators.required]),
    });

    if (this.Id) {
      this.notaService.obtenerNotaPorId(this.Id).subscribe(nota => {
        this.nota = nota;
        this.edit = true;
        this.titulo().setValue(nota.Titulo);
        this.cuerpo().setValue(nota.Cuerpo);
      });
    }
  }

  public titulo(): AbstractControl {
    return this.formulario.get('titulo');
  }

  public cuerpo(): AbstractControl {
    return this.formulario.get('cuerpo');
  }

  onSubmit(): Observable<Nota> {
    if (this.formulario.valid ) {
      this.nota.Titulo = this.titulo().value;
      this.nota.Cuerpo = this.cuerpo().value;
      if (this.edit) {
        return this.notaService.modificar(this.nota);
      } else {
        return this.notaService.crear(this.nota);
      }
    }
  }

}
