import {Component, OnInit, ViewChild} from '@angular/core';
import {UsuarioService} from '../shared/services/usuario.service';
import {AutenticacionService} from '../shared/services/autenticacion.service';
import {NgForm} from '@angular/forms';
import {Usuario} from '../shared/models/usuario';

@Component({
  selector: 'app-recuperarcontrasena',
  templateUrl: './recuperarcontrasena.component.html',
  styleUrls: ['./recuperarcontrasena.component.css']
})
export class RecuperarcontrasenaComponent implements OnInit {
  @ViewChild('frmUpdatePass', {static: false}) updatePassForm: NgForm;

  usuario: Usuario;
  cambiado = false;

  constructor(private usuarioService: UsuarioService,
              private autenticacionService: AutenticacionService) {
  }

  ngOnInit(): void {
  }

  onChange() {

    this.usuarioService.obtenerUsuarioPorEmail(this.updatePassForm.value.email).subscribe(usuario => {
        usuario.Pass = this.autenticacionService.generarContrasena();

        console.log(usuario.Pass);
        this.usuarioService.recuperarPass(usuario).subscribe(result => {
          console.log(result);
          //Indicar contraseña cambiada
          this.cambiado = true;
        });

      }
    );

  }
}
