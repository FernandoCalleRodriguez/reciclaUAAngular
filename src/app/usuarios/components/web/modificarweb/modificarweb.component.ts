import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UsuarioService} from '../../../../shared/services/usuario.service';
import {Usuario} from '../../../../shared/models/Usuario';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-modificarweb',
  templateUrl: './modificarweb.component.html',
  styleUrls: ['./modificarweb.component.css']
})
export class ModificarwebComponent implements OnInit {

  @ViewChild('frmModificar', {static: false}) updateForm: NgForm;

  usuario: Usuario;
  usuarioId: string;

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected  usuarioService: UsuarioService) {
  }

  ngOnInit(): void {

    this.route.params.subscribe(param => {

      this.usuarioId = param['usuarioId'];
      this.usuarioService.obtenerWebPorId(this.usuarioId).subscribe(usuario => {
        this.usuario = usuario;

      });

    });
  }

  onUpdate() {

    this.usuario.Nombre = this.updateForm.value.name;
    this.usuario.Apellidos = this.updateForm.value.surname;
    this.usuario.Email = this.updateForm.value.email;
    console.log(this.usuario);
    this.usuarioService.modificarWeb(this.usuario).subscribe(
      data => {
        this.router.navigate(['../list-web']);
      }, error => {
        console.log('Crear usuario admin fallido', error);
      }
    );
  }

}
