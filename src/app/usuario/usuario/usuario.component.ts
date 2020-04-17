import {Component, OnInit} from '@angular/core';
import {UsuarioService} from '../../shared/services/usuario.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Usuario} from '../../shared/models/usuario';
import {AutenticacionService} from '../../shared/services/autenticacion.service';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import Swal from 'sweetalert2';

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
                private modalService: NgbModal) {
        this.route.params.subscribe(param => {

            this.tipousuario = param['tipousuario'];
            this.usuarioId = param['usuarioId'];

            this.usuarioService.obtenerUsuarioPorId(this.usuarioId, this.tipousuario).subscribe(usuario => {
                this.usuario = usuario;

                if (this.autenticacionService.getID() == this.usuarioId) {
                    this.perfil = true;
                }
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

    obtenerUsuarioPorId(id) {
        this.usuarioService.obtenerUsuarioPorId(id, this.tipousuario).subscribe(usuario => {
            this.usuario = usuario;
            this.rellenarFormulario(this.usuario);

        });
    }

    rellenarFormulario(usuario: Usuario) {

        this.email().setValue(usuario.Email);
        this.nombre().setValue(usuario.Nombre);
        this.apellidos().setValue(usuario.Apellidos);
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

    modificarUsuario(content) {
        this.obtenerUsuarioPorId(this.usuarioId);
        this.modal = this.modalService.open(content);
        this.isEdit = true;

    }

    borrarUsuario() {
        Swal.fire({
            title: '¿Estas Seguro de que quieres borrar al usuario ' + this.usuario.Id + ' ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar!',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.value) {
                this.usuarioService.borrarUsuario(this.usuario.Id, this.tipousuario).subscribe(res => {
                    this.toaster.error('Usuario borrado');
                    this.router.navigate(['/listarusuario/' + this.tipousuario]);

                });
            }
        });


    }

    onUpdate() {

        this.usuario.Nombre = this.formulario.value.name;
        this.usuario.Apellidos = this.formulario.value.surname;
        this.usuario.Email = this.formulario.value.email;
        console.log(this.usuario);
        this.usuarioService.modificarUsuario(this.usuario, this.tipousuario).subscribe(
            data => {
                this.cerrar();
                this.obtenerUsuarioPorId(this.usuarioId);

            }, error => {
                console.log('Crear usuario admin fallido', error);
            }
        );
    }

    cerrar() {
        this.modal.close();
    }
}
