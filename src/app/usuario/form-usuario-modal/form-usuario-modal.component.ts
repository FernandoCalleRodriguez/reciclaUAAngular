import {Component, Input, OnInit} from '@angular/core';
import {Usuario} from '../../shared/models/usuario';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {UsuarioService} from '../../shared/services/usuario.service';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {AutenticacionService} from '../../shared/services/autenticacion.service';

@Component({
  selector: '<app-form-usuario-modal',
  templateUrl: './form-usuario-modal.component.html',
  styleUrls: ['./form-usuario-modal.component.css']
})
export class FormUsuarioModalComponent implements OnInit {
  public formulario: FormGroup;
  public usuario: Usuario = new Usuario();
  public isCreate: boolean;
  @Input() usuarioId: number;
  @Input() isEdit: boolean;
  @Input() tipousuario: string;

  constructor(protected usuarioService: UsuarioService,
              private toaster: ToastrService) {
  }

  ngOnInit(): void {


    if (this.usuarioId != null) {
      this.formulario = new FormGroup({
        email: new FormControl(null, [Validators.required, Validators.email]),
        pwd: new FormControl(null),
        name: new FormControl(null, [Validators.required]),
        surname: new FormControl(null, [Validators.required]),
        date: new FormControl(null),
        verificado: new FormControl(null),
      });

      this.usuarioService.obtenerUsuarioPorId(this.usuarioId, this.tipousuario).subscribe(usuario => {
        this.usuario = usuario;
        this.rellenarFormulario(this.usuario);
      });

      if (this.isEdit) {
        this.habilitarCampos();

      } else {
        this.deshabilitarCampos();
      }
    } else {
      this.formulario = new FormGroup({
        email: new FormControl(null, [Validators.required, Validators.email]),
        pwd: new FormControl(null, [Validators.required,
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&-_])[A-Za-z\\d$@$!%*?&-_].{7,}$')]),
        pwd2: new FormControl(null, [Validators.required,
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&-_])[A-Za-z\\d$@$!%*?&-_].{7,}$')]),
        name: new FormControl(null, [Validators.required]),
        surname: new FormControl(null, [Validators.required]),
        date: new FormControl(null),
        verificado: new FormControl(null),
      });

      this.isCreate = true;
      this.habilitarCampos();

    }
  }


  rellenarFormulario(usuario: Usuario) {
    if (usuario == null) {
      this.email().setValue('');
      this.nombre().setValue('');
      this.apellidos().setValue('');
      this.formulario.get('date').setValue('');
      this.formulario.get('verificado').setValue('');
    } else {
      this.email().setValue(usuario.Email);
      this.nombre().setValue(usuario.Nombre);
      this.apellidos().setValue(usuario.Apellidos);
      this.formulario.get('verificado').setValue(usuario.EmailVerificado ? 'Si' : 'No');
    }


  }

  public email(): AbstractControl {
    return this.formulario.get('email');
  }

  public nombre(): AbstractControl {
    return this.formulario.get('name');
  }

  public apellidos(): AbstractControl {
    return this.formulario.get('surname');
  }

  deshabilitarCampos() {
    this.email().disable();
    this.nombre().disable();
    this.apellidos().disable();
    this.formulario.get('date').disable();
    this.formulario.get('verificado').disable();
  }

  habilitarCampos() {
    this.email().enable();
    this.nombre().enable();
    this.apellidos().enable();
  }

  onSubmit(): Observable<Usuario> {
    this.usuario = {
      Id: this.usuarioId,
      Email: this.formulario.value.email,
      Nombre: this.formulario.value.name,
      Apellidos: this.formulario.value.surname,
    };

    if (!this.isEdit) {
      this.usuario.Pass = this.formulario.value.pwd;

      return this.usuarioService.CrearUsuario(this.usuario, this.tipousuario);

    } else if (this.isEdit) {

      return this.usuarioService.modificarUsuario(this.usuario, this.tipousuario);
    }

  }
}
