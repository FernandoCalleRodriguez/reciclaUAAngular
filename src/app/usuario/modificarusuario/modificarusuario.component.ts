import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {Usuario} from '../../shared/models/usuario';
import {ActivatedRoute, Router} from '@angular/router';
import {UsuarioService} from '../../shared/services/usuario.service';

@Component({
  selector: 'app-modificarusuario',
  templateUrl: './modificarusuario.component.html',
  styleUrls: ['./modificarusuario.component.css']
})
export class ModificarusuarioComponent implements OnInit {

  formularioModificar: FormGroup;
  usuario: Usuario;
  usuarioId: string;
  tipousuario: string;

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected  usuarioService: UsuarioService) {
  }

  ngOnInit(): void {

    this.route.params.subscribe(param => {

      this.tipousuario = param['tipousuario'];
      this.usuarioId = param['usuarioId'];

      this.usuarioService.obtenerUsuarioPorId(this.usuarioId, this.tipousuario).subscribe(usuario => {
        this.usuario = usuario;

      });

    });

    this.formularioModificar = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      name: new FormControl(null, [Validators.required]),
      surname: new FormControl(null, [Validators.required]),
    });
  }

  onUpdate() {

    this.usuario.Nombre = this.formularioModificar.value.name;
    this.usuario.Apellidos = this.formularioModificar.value.surname;
    this.usuario.Email = this.formularioModificar.value.email;
    console.log(this.usuario);
    this.usuarioService.modificarUsuario(this.usuario, this.tipousuario).subscribe(
      data => {
        this.router.navigate(['/listarusuario/' + this.tipousuario]);
      }, error => {
        console.log('Crear usuario admin fallido', error);
      }
    );
  }

}
