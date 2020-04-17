import {Component, ElementRef, OnChanges, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Usuario} from '../../shared/models/usuario';
import {UsuarioService} from '../../shared/services/usuario.service';
import {AbstractControl, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {ToastrService} from 'ngx-toastr';
import {NgbModal, NgbModalModule, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-usuariolistar',
  templateUrl: './usuariolistar.component.html',
  styleUrls: ['./usuariolistar.component.css']
})
export class UsuariolistarComponent implements OnInit, OnDestroy {
  formulario: FormGroup;
  tipousuario: string; // web o admin
  usuarios: Usuario[];
  usuario: Usuario;
  error = false;
  isEdit: boolean;
  isCreate: boolean;

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();

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

      console.log('antes');

      if (!this.dtElement) {
        this.inicializar(param);

      } else {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.inicializar(param);
        });

      }


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

  inicializar(param) {
    this.tipousuario = param['tipousuario'];

    this.usuarioService.obtenerUsuarios(this.tipousuario).subscribe(usuarios => {
      this.usuarios = usuarios;
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  obtenerUsuarioPorId(id) {
    this.usuarioService.obtenerUsuarioPorId(id, this.tipousuario).subscribe(usuario => {
      this.usuario = usuario;
      this.rellenarFormulario(this.usuario);

    });
  }

  borrarUsuario(usuario: Usuario) {
    Swal.fire({
      title: '¿Estás seguro de que quieres borrar al usuario ' + usuario.Id + ' ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.usuarioService.borrarUsuario(usuario.Id, this.tipousuario).subscribe(res => {
          const index = this.usuarios.indexOf(usuario);
          if (index > -1) {
            this.usuarios.splice(index, 1);
          }
          this.refresh();
          this.toaster.error('Usuario ' + usuario.Id + ' borrado');
        });
      }
    });


  }

  modificarUsuario(id, content) {
    this.obtenerUsuarioPorId(id);
    this.habilitarCampos();
    this.modalService.open(content);
    this.isEdit = true;
    this.isCreate = false;

  }

  crearUsuario(content) {
    this.rellenarFormulario(null);
    this.habilitarCampos();
    this.modalService.open(content);
    this.isEdit = false;
    this.isCreate = true;
  }

  mostrarUsuario(id, content) {
    this.obtenerUsuarioPorId(id);
    this.deshabilitarCampos();
    this.modalService.open(content);
    this.isEdit = false;
    this.isCreate = false;

  }

  onSubmit(modal: NgbModalRef) {
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
            if (!this.usuarios) {
              this.usuarios = [];
            }
            this.usuarios.push(data);
            modal.dismiss();
            this.refresh();
          }

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
          this.usuarios.forEach((element, i, array) => {
            if (element.Id === this.usuario.Id) {
              array[i] = this.usuario;
            }
          });
          modal.dismiss();
          this.refresh();
        }, error => {
          console.log('Modificar usuario admin fallido', error);
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
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

}
