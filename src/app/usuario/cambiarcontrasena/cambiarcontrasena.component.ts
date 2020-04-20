import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UsuarioService} from '../../shared/services/usuario.service';
import {Usuario} from '../../shared/models/usuario';

@Component({
  selector: 'app-cambiarcontrasena',
  templateUrl: './cambiarcontrasena.component.html',
  styleUrls: ['./cambiarcontrasena.component.css']
})
export class CambiarcontrasenaComponent implements OnInit {

  formularioCambiar: FormGroup;
  usuarioId: string;
  usuario: Usuario;
  cambiado = false;
  error = false;

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected  usuarioService: UsuarioService) {
  }

  ngOnInit(): void {

    this.route.params.subscribe(param => {

      this.usuarioId = param['usuarioId'];

      this.usuarioService.obtenerUsuarioPorId(this.usuarioId, 'administrador').subscribe(usuario => {
        this.usuario = usuario;

      });

    });

    this.formularioCambiar = new FormGroup({
      pwd: new FormControl(null, [Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&-_])[A-Za-z\\d$@$!%*?&-_].{7,}$')]),
      pwd2: new FormControl(null, [Validators.required]),
    });
  }

  changePass() {
    this.usuario.Pass = this.formularioCambiar.value.pwd;

    this.usuarioService.cambiarPass(this.usuario).subscribe(usuario => {
      if (usuario != null) {
        console.log(usuario);
        this.cambiado = true;
      } else {
        this.error = true;

      }

    }, error => {
      this.error = true;

    });
  }
}
