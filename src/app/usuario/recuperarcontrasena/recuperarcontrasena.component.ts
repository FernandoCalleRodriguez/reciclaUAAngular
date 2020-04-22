import {Component, OnInit, ViewChild} from '@angular/core';
import {UsuarioService} from '../../shared/services/usuario.service';
import {AutenticacionService} from '../../shared/services/autenticacion.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Usuario} from '../../shared/models/usuario';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-recuperarcontrasena',
  templateUrl: './recuperarcontrasena.component.html',
  styleUrls: ['./recuperarcontrasena.component.css']
})
export class RecuperarcontrasenaComponent implements OnInit {

  usuario: Usuario;
  formularioRecuperar: FormGroup;

  constructor(private usuarioService: UsuarioService,
              private autenticacionService: AutenticacionService,
              private toaster: ToastrService) {
    this.autenticacionService.noEstaAutenticado();
  }

  ngOnInit(): void {
    this.formularioRecuperar = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),

    });
  }

  onChange() {

    this.usuarioService.obtenerUsuarioPorEmail(this.formularioRecuperar.value.email).subscribe(usuario => {

        if (usuario == null) {
          this.toaster.error(' El email introducido no corresponde a ningún usuario');

        } else {
          usuario.Pass = this.autenticacionService.generarContrasena();
          this.usuarioService.recuperarPass(usuario).subscribe(result => {
            this.toaster.success('La contraseña se ha cambiado. Revise su correo electrónico');
          }, error => {
            this.toaster.error(' No se ha podio restablecer la contraseña. Vuelva a probar más tarde');

          });
        }


      }, error => {
        this.toaster.error(' No se ha podio restablecer la contraseña. Vuelva a probar más tarde');

      }
    );

  }
}
