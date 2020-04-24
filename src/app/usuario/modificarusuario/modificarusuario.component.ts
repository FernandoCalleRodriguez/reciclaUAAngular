import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {Usuario} from '../../shared/models/usuario';
import {ActivatedRoute, Router} from '@angular/router';
import {UsuarioService} from '../../shared/services/usuario.service';
import {AutenticacionService} from '../../shared/services/autenticacion.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-modificarusuario',
  templateUrl: './modificarusuario.component.html',
  styleUrls: ['./modificarusuario.component.css']
})
export class ModificarusuarioComponent implements OnInit {

  formularioModificar: FormGroup;
  usuario: Usuario;

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected  usuarioService: UsuarioService,
              protected autenticacionService: AutenticacionService,
              private toaster: ToastrService) {

  }

  ngOnInit(): void {
    this.formularioModificar = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      name: new FormControl(null, [Validators.required]),
      surname: new FormControl(null, [Validators.required]),
    });
    this.usuarioService.getLoggedUser().subscribe(u => {
      this.usuario = u;
      this.formularioModificar.get('email').setValue(u.Email);
      this.formularioModificar.get('name').setValue(u.Nombre);
      this.formularioModificar.get('surname').setValue(u.Apellidos);
    }, error => {
      this.autenticacionService.Logout();
    });
  }

  onUpdate() {
    this.usuario.Nombre = this.formularioModificar.value.name;
    this.usuario.Apellidos = this.formularioModificar.value.surname;
    this.usuario.Email = this.formularioModificar.value.email;
    console.log(this.formularioModificar.value.email);

    this.usuarioService.obtenerUsuarioPorEmail(this.formularioModificar.value.email).subscribe(result => {
      console.log(result);

      if (result && result.Id != this.usuario.Id) {

        this.toaster.error('  El Correo electrónico utilizado ya existe');

      } else {
        this.usuarioService.modificarUsuario(this.usuario, 'administrador').subscribe(
          data => {
            this.toaster.success('Usuario ' + this.usuario.Id + ' modificado');

            this.router.navigate(['/perfil']);
          }, error => {
            this.toaster.error('Error al modificar el usuario');

          }
        );
      }
    });
  }

}
