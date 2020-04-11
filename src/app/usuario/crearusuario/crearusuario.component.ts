import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UsuarioService} from '../../shared/services/usuario.service';
import {NgForm} from '@angular/forms';
import {Usuario} from '../../shared/models/usuario';

@Component({
  selector: 'app-crearusuario',
  templateUrl: './crearusuario.component.html',
  styleUrls: ['./crearusuario.component.css']
})
export class CrearusuarioComponent implements OnInit {
  @ViewChild('frmRegistro', {static: false}) singupForm: NgForm;

  tipousuario: string;
  usuario: Usuario;
  error = false;

  constructor(protected route: ActivatedRoute,
              private usuarioService: UsuarioService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(param => {

      this.tipousuario = param['tipousuario'];
    });
  }

  onRegister() {
    this.usuario = {
      Nombre: this.singupForm.value.name,
      Apellidos: this.singupForm.value.surname,
      Email: this.singupForm.value.email,
      Pass: this.singupForm.value.contrasena,
    };

    this.usuarioService.CrearUsuario(this.usuario, this.tipousuario).subscribe(
      data => {
        if (data === null) {
          this.error = true;
        } else {
          console.log(this.usuario);
          this.router.navigate(['/listarusuario/' + this.tipousuario]);
        }

      }, error => {
        console.log('Crear usuario ' + this.tipousuario + ' fallido', error);
      }
    );
  }
}
