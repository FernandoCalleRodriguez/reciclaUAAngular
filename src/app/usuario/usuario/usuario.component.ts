import {Component, OnInit} from '@angular/core';
import {UsuarioService} from '../../shared/services/usuario.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Usuario} from '../../shared/models/usuario';
import {AutenticacionService} from '../../shared/services/autenticacion.service';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import Swal from 'sweetalert2';
import {FormUsuarioModalComponent} from '../form-usuario-modal/form-usuario-modal.component';
import {DtoptionsService} from '../../shared/services/dtoptions.service';
import {consoleTestResultHandler} from 'tslint/lib/test';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  tipousuario: string;
  usuarioId: string;
  usuario: Usuario;
  perfil = false;
  isEdit = false;
  modal: NgbModalRef;
  formulario: FormGroup;


  constructor(protected route: ActivatedRoute,
              private usuarioService: UsuarioService,
              private  autenticacionService: AutenticacionService,
              private router: Router,
              private toaster: ToastrService,
              private modalService: NgbModal,
              private dtoptionsService: DtoptionsService) {
    this.autenticacionService.estaAutenticado();
    this.tipousuario = 'administrador';

    this.usuarioService.obtenerUsuarioPorId(this.autenticacionService.getID(), this.tipousuario).subscribe(usuario => {
      this.usuario = usuario;

      if (this.autenticacionService.getID() == this.usuarioId) {
        this.perfil = true;
      }
    }, error => {
      this.router.navigate(['/']);
    });


    this.formulario = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      name: new FormControl(null, [Validators.required]),
      surname: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
  }


  modUsuario(usuario: Usuario, modal) {
    this.usuario = usuario;
    this.isEdit = true;
    this.modalService.open(modal);
  }

  modificarUsuario(form: FormUsuarioModalComponent, modal: NgbModalRef) {
    this.usuarioService.obtenerUsuarioPorEmail(form.formulario.value.email).subscribe(result => {
      console.log(result);
      if (result && result.Id != this.usuario.Id) {

        this.toaster.error('  El Correo electrónico utilizado ya existe');

      } else {
        form.onSubmit().subscribe(usuario => {
          this.usuario = usuario;
          modal.dismiss();
          this.toaster.success('Usuario ' + this.usuario.Id + ' modificado');

        });
      }
    });

  }


  borrarUsuario() {

    Swal.fire(this.dtoptionsService.getSwalWarningOptions('el usuario', this.usuario.Id)).then((result) => {
      if (result.value) {
        this.usuarioService.borrarUsuario(this.usuario.Id, this.tipousuario).subscribe(res => {
          this.toaster.error('Usuario borrado');
          this.autenticacionService.Logout();
        });
      }
    }, error => {
      this.toaster.error(' Error al borrar usuario');
    });

  }

}
