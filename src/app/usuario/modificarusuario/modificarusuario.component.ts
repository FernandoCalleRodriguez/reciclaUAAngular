import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Usuario} from '../../shared/models/usuario';
import {ActivatedRoute, Router} from '@angular/router';
import {UsuarioService} from '../../shared/services/usuario.service';

@Component({
  selector: 'app-modificarusuario',
  templateUrl: './modificarusuario.component.html',
  styleUrls: ['./modificarusuario.component.css']
})
export class ModificarusuarioComponent implements OnInit {

  @ViewChild('frmModificar', {static: false}) updateForm: NgForm;

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
  }

  onUpdate() {

    this.usuario.Nombre = this.updateForm.value.name;
    this.usuario.Apellidos = this.updateForm.value.surname;
    this.usuario.Email = this.updateForm.value.email;
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
