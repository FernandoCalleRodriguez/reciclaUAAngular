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
  error = false;

  constructor(private usuarioService: UsuarioService,
              private autenticacionService: AutenticacionService) {
  }

  ngOnInit(): void {
  }

  onChange() {

    this.usuarioService.obtenerUsuarioPorEmail(this.updatePassForm.value.email).subscribe(usuario => {

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
