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
                ) {
        this.route.params.subscribe(param => {

            this.tipousuario = param['tipousuario'];
            this.usuarioId = param['usuarioId'];

            this.usuarioService.obtenerUsuarioPorId(this.usuarioId, this.tipousuario).subscribe(usuario => {
                this.usuario = usuario;

                if (this.autenticacionService.getID() == this.usuarioId) {
                    this.perfil = true;
                }
            }, error => {
              this.toaster.error('Usuario no encontrado');
              this.router.navigate(['/usuario/administrador/' + this.autenticacionService.getID()]);
            });
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
        form.onSubmit().subscribe(usuario => {
            this.usuario = usuario;
            modal.dismiss();
            this.toaster.success('Usuario ' + this.usuarioId + ' modificado');

        });

    }


    borrarUsuario() {
        Swal.fire({
            title: '¿Estas Seguro de que quieres borrar al usuario ' + this.usuario.Id + ' ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí!',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.value) {
                this.usuarioService.borrarUsuario(this.usuario.Id, this.tipousuario).subscribe(res => {
                    this.toaster.error('Usuario ' + this.usuarioId + ' borrado');
                    this.router.navigate(['/listarusuario/' + this.tipousuario]);

                });
            }
        });


    }

}
