import {Component, OnInit} from '@angular/core';
import {UsuarioService} from '../../shared/services/usuario.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Usuario} from '../../shared/models/usuario';
import {AutenticacionService} from '../../shared/services/autenticacion.service';

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

    constructor(protected route: ActivatedRoute,
                private usuarioService: UsuarioService,
                private  autenticacionService: AutenticacionService,
                private router: Router) {
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

    }

    ngOnInit(): void {
    }


    borrarUsuario() {
        this.usuarioService.borrarUsuario(this.usuarioId, this.tipousuario).subscribe(res => {
            this.router.navigate(['/listarusuario/' + this.tipousuario]);
        });
    }
}
