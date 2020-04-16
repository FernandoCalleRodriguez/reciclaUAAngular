import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Usuario} from '../../shared/models/usuario';
import {UsuarioService} from '../../shared/services/usuario.service';
import {AbstractControl, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {ToastrService} from 'ngx-toastr';
import {NgbModal, NgbModalModule, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-usuariolistar',
  templateUrl: './usuariolistar.component.html',
  styleUrls: ['./usuariolistar.component.css']
})
export class UsuariolistarComponent implements OnInit {
  formulario: FormGroup;
  tipousuario: string; // web o admin
  usuarios: Usuario[];
  usuario: Usuario;
  error = false;
  isEdit: boolean;
  isCreate: boolean;

  modal: NgbModalRef;

  constructor(protected route: ActivatedRoute,
              private usuarioService: UsuarioService,
              private router: Router,
              private toaster: ToastrService,
              private modalService: NgbModal) {
    this.isEdit = false;
    this.isCreate = false;
  }

  ngOnInit(): void {
    this.route.params.subscribe(param => {

      this.tipousuario = param['tipousuario'];

      this.usuarioService.obtenerUsuarios(this.tipousuario).subscribe(usuarios => {
        this.usuarios = usuarios;
        console.log(usuarios);
      });
    });

    this.formulario = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      pwd: new FormControl(null, [
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&-_])[A-Za-z\\d$@$!%*?&-_].{7,}$')]),
      name: new FormControl(null, [Validators.required]),
      surname: new FormControl(null, [Validators.required]),
      date: new FormControl(null),
      verificado: new FormControl(null),
    });


  }

  obtenerUsuarioPorId(id) {
    this.usuarioService.obtenerUsuarioPorId(id, this.tipousuario).subscribe(usuario => {
      this.usuario = usuario;
      this.rellenarFormulario(this.usuario);

    });
  }

  borrarUsuario(id) {
    Swal.fire({
      title: '¿Estas Seguro de que quieres borrar al usuario ' + id + ' ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.usuarioService.borrarUsuario(id, this.tipousuario).subscribe(res => {
          this.toaster.error('Usuario borrado');
        });
      }
      this.refresh();
    });


  }

  modificarUsuario(id, content) {
    this.obtenerUsuarioPorId(id);
    this.habilitarCampos();
    this.modal = this.modalService.open(content);
    this.isEdit = true;
    this.isCreate = false;

  }

  crearUsuario(content) {
    this.rellenarFormulario(null);
    this.habilitarCampos();
    this.modal = this.modalService.open(content);
    this.isEdit = false;
    this.isCreate = true;
  }

  mostrarUsuario(id, content) {
    this.obtenerUsuarioPorId(id);
    this.deshabilitarCampos();
    this.modal = this.modalService.open(content);
    this.isEdit = false;
    this.isCreate = false;

  }

  onSubmit() {
    if (this.isCreate) {
      this.usuario = {
        Email: this.formulario.value.email,
        Pass: this.formulario.value.pwd,
        Nombre: this.formulario.value.name,
        Apellidos: this.formulario.value.surname,
      };

      this.usuarioService.CrearUsuario(this.usuario, this.tipousuario).subscribe(
        data => {
          if (data === null) {
            this.error = true;
          } else {
            console.log(this.usuario);
            this.cerrar();
            this.refresh();          }

        }, error => {
          console.log('Crear usuario ' + this.tipousuario + ' fallido', error);
        }
      );
    } else if (this.isEdit) {
      this.usuario.Nombre = this.formulario.value.name;
      this.usuario.Apellidos = this.formulario.value.surname;
      this.usuario.Email = this.formulario.value.email;
      console.log(this.usuario);
      this.usuarioService.modificarUsuario(this.usuario, this.tipousuario).subscribe(
        data => {
          this.cerrar();
          this.refresh();
        }, error => {
          console.log('Crear usuario admin fallido', error);
        }
      );
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
      this.formulario.get('date').setValue(usuario.Fecha.toLocaleString());
      this.formulario.get('verificado').setValue(usuario.EmailVerificado ? 'Si' : 'No');
    }


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

  refresh() {
    this.usuarioService.obtenerUsuarios(this.tipousuario).subscribe(usuarios => {
      this.usuarios = usuarios;
      console.log(usuarios);
    });
  }

  cerrar() {
    this.modal.close();
  }
}
