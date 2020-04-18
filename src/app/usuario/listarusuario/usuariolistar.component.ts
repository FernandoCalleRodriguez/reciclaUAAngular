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
import {FormUsuarioModalComponent} from '../form-usuario-modal/form-usuario-modal.component';

@Component({
  selector: 'app-usuariolistar',
  templateUrl: './usuariolistar.component.html',
  styleUrls: ['./usuariolistar.component.css']
})
export class UsuariolistarComponent implements OnInit, OnDestroy {
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

      if (!this.dtElement) {
        this.inicializar(param);

      } else {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.inicializar(param);
        });

      }

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

  modUsuario(usuario: Usuario, modal) {
    this.usuario = usuario;
    this.isEdit = true;
    this.isCreate = false;
    this.modalService.open(modal);
  }

  modificarUsuario(form: FormUsuarioModalComponent, modal: NgbModalRef) {
    form.onSubmit().subscribe(usuario => {
      this.usuarios.forEach((element, i, array) => {
        if (element.Id === usuario.Id) {
          array[i] = usuario;
        }
      });
      modal.dismiss();
      this.refresh();
      this.toaster.success('Usuario ' + usuario.Id + ' modificado');
    });

  }

  addUsuario(form) {
    this.isEdit = false;
    this.isCreate = true;
    this.modalService.open(form);
  }

  crearUsuario(form: FormUsuarioModalComponent, modal: NgbModalRef) {

    form.onSubmit().subscribe(usuario => {
      if (!this.usuarios) {
        this.usuarios = [];
      }
      this.usuarios.push(usuario);
      modal.dismiss();
      this.refresh();
      this.toaster.success('Usuario ' + usuario.Id + ' creado');

    });
  }

  mostrarUsuario(usuario: Usuario, modal) {
    this.usuario = usuario;
    this.isEdit = false;
    this.isCreate = false;
    this.modalService.open(modal);
  }


  refresh() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

}
