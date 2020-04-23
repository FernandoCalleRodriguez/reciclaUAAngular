import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UsuarioService} from '../../shared/services/usuario.service';
import {Usuario} from '../../shared/models/usuario';
import {AutenticacionService} from '../../shared/services/autenticacion.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-cambiarcontrasena',
  templateUrl: './cambiarcontrasena.component.html',
  styleUrls: ['./cambiarcontrasena.component.css']
})
export class CambiarcontrasenaComponent implements OnInit {

  formularioCambiar: FormGroup;
  usuarioId: string;
  usuario: Usuario;

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected usuarioService: UsuarioService,
              private autenticacionService: AutenticacionService,
              private toaster: ToastrService) {
    this.autenticacionService.estaAutenticado();

  }

  ngOnInit(): void {
    this.usuarioService.getLoggedUser().subscribe(usuario => {
      this.usuario = usuario;
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
        this.toaster.success('La contraseña se ha cambiado con éxito');

      } else {
        this.toaster.error('La contraseña NO se ha podido cambiar. Revise si el correo es correcto');

      }

    }, error => {
      this.toaster.error('La contraseña NO se ha podido cambiar. Revise si el correo es correcto');


    });
  }
}
