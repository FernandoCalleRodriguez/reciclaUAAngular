import {Component, OnInit, ViewChild} from '@angular/core';
import {UsuarioService} from '../shared/services/usuario.service';
import {AutenticacionService} from '../shared/services/autenticacion.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Usuario} from '../shared/models/usuario';

@Component({
  selector: 'app-recuperarcontrasena',
  templateUrl: './recuperarcontrasena.component.html',
  styleUrls: ['./recuperarcontrasena.component.css']
})
export class RecuperarcontrasenaComponent implements OnInit {

  usuario: Usuario;
  cambiado = false;
  error = false;
  formularioRecuperar: FormGroup;

  constructor(private usuarioService: UsuarioService,
              private autenticacionService: AutenticacionService) {
  }

  ngOnInit(): void {
    this.formularioRecuperar = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),

    });
  }

  onChange() {

    this.usuarioService.obtenerUsuarioPorEmail(this.formularioRecuperar.value.email).subscribe(usuario => {

        if (usuario == null) {
          this.error = true;

        } else {
          usuario.Pass = this.autenticacionService.generarContrasena();
          this.usuarioService.recuperarPass(usuario).subscribe(result => {
            this.cambiado = true;
          });
        }


      }, error => {
        this.error = true;

      }
    );

  }
}
