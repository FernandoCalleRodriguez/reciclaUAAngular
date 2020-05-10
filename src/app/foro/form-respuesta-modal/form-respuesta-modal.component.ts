import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Usuario} from '../../shared/models/usuario';
import {Respuesta} from '../../shared/models/respuesta';
import {Duda} from '../../shared/models/duda';
import {TemaService} from '../../shared/services/tema.service';
import {DudaService} from '../../shared/services/duda.service';
import {RespuestaService} from '../../shared/services/respuesta.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UsuarioService} from '../../shared/services/usuario.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-form-respuesta-modal',
  templateUrl: './form-respuesta-modal.component.html',
  styleUrls: ['./form-respuesta-modal.component.css']
})
export class FormRespuestaModalComponent implements OnInit {

  public formulario: FormGroup;
  public user: Usuario = new Usuario();
  public respuesta: Respuesta = new Respuesta();
  public duda: Duda = null;
  public edit = false;

  // tslint:disable-next-line:no-input-rename
  @Input('dudaId')
  public dId: number;
  @Input()
  public respuestaId: number;

  constructor(protected dudaService: DudaService, protected respuestaService: RespuestaService, protected usuarioService: UsuarioService) {
    this.usuarioService.getLoggedUser().subscribe(u => {
      this.user = u;
    });
  }

  ngOnInit(): void {
    this.formulario = new FormGroup({
      cuerpo: new FormControl(null, [Validators.required, Validators.maxLength(1500)]),
      duda: new FormControl(null, [Validators.required])
    });

    if (this.dId) {
      // console.log('DudaID: ' + this.dId);
      this.dudaService.getDudaById(this.dId).subscribe(d => {
        this.duda = d;
        this.dudaId().setValue(d.Id);
        this.dudaId().disable();
      });
    }

    if (this.respuestaId) {
      this.edit = true;
      this.respuestaService.getRespuestaById(this.respuestaId).subscribe(r => {
        this.respuesta = r;
        this.cuerpo().setValue(r.Cuerpo);
      });
    }
  }

  public cuerpo(): AbstractControl {
    return this.formulario.get('cuerpo');
  }

  public dudaId(): AbstractControl {
    return this.formulario.get('duda');
  }

  onSubmit(): Observable<Respuesta> {
    if (this.formulario.valid && this.user.Id) {
      this.respuesta.Cuerpo = this.cuerpo().value;
      this.respuesta.Duda_oid = this.dudaId().value;

      if (this.edit) {
        return this.respuestaService.modificar(this.respuesta);
      } else {
        this.respuesta.Usuario_oid = this.user.Id;
        return this.respuestaService.crear(this.respuesta);
      }
    }
  }

}
