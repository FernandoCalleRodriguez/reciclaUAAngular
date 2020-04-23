import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {TemaService} from '../../shared/services/tema.service';
import {DudaService} from '../../shared/services/duda.service';
import {Tema} from '../../shared/models/tema';
import {Duda} from '../../shared/models/duda';
import {ActivatedRoute, Router} from '@angular/router';
import {Usuario} from '../../shared/models/usuario';
import {UsuarioService} from '../../shared/services/usuario.service';
import {RespuestaService} from '../../shared/services/respuesta.service';
import {Respuesta} from '../../shared/models/respuesta';
import {AutenticacionService} from '../../shared/services/autenticacion.service';

@Component({
  selector: 'app-form-respuesta',
  templateUrl: './form-respuesta.component.html',
  styleUrls: ['./form-respuesta.component.css']
})
export class FormRespuestaComponent implements OnInit {
  public formulario: FormGroup;
  public user: Usuario = new Usuario();
  public respuesta: Respuesta = new Respuesta();
  public duda: Duda = null;
  public edit = false;

  constructor(protected temaService: TemaService, protected dudaService: DudaService, protected respuestaService: RespuestaService,
              protected router: Router, protected usuarioService: UsuarioService, protected route: ActivatedRoute,
              protected autenticacionService: AutenticacionService) {
    autenticacionService.estaAutenticado();
    this.usuarioService.getLoggedUser().subscribe(u => {
      this.user = u;
    });
    this.route.params.subscribe(params => {
      if (params.respuestaId) {
        this.edit = true;
        respuestaService.getRespuestaById(params.respuestaId).subscribe(r => {
          this.respuesta = r;
          this.cuerpo().setValue(r.Cuerpo);
        });
      }
      if (params.dudaId) {
        dudaService.getDudaById(params.dudaId).subscribe(d => {
          this.duda = d;
          this.dudaId().setValue(d.Id);
          this.dudaId().disable();
        });
      }
    });
  }

  ngOnInit(): void {
    this.formulario = new FormGroup({
      cuerpo: new FormControl(null, [Validators.required]),
      duda: new FormControl(null, [Validators.required])
    });
  }

  public cuerpo(): AbstractControl {
    return this.formulario.get('cuerpo');
  }

  public dudaId(): AbstractControl {
    return this.formulario.get('duda');
  }

  onSubmit() {
    if (this.formulario.valid && this.user.Id) {
      this.respuesta.Cuerpo = this.cuerpo().value;
      this.respuesta.Duda_oid = this.dudaId().value;
      if (this.edit) {
        this.respuestaService.modificar(this.respuesta).subscribe(d => {
          this.router.navigate(['/foro/duda/' + this.dudaId().value + '/respuestas']);
        });
      } else {
        this.respuesta.Usuario_oid = this.user.Id;
        this.respuestaService.crear(this.respuesta).subscribe(id => {
          this.router.navigate(['/foro/duda/' + this.dudaId().value + '/respuestas']);
        });
      }
    }
  }
}
