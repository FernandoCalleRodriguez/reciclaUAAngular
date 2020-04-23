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
    this.usuarioService.getLoggedUser().subscribe(u => {
      this.usuario = u;
    }, error => {
      this.autenticacionService.Logout();
    });
  }

  ngOnInit(): void {

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
    this.usuarioService.modificarUsuario(this.usuario, 'administrador').subscribe(
      data => {
        this.toaster.success(' Usuario' + this.usuario.Id + ' modificado');

        this.router.navigate(['/perfil']);
      }, error => {
        this.toaster.error(' Error al modificar el usuario');

      }
    );
  }

}
