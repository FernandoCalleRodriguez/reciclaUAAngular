import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UsuarioService} from '../../shared/services/usuario.service';
import {Usuario} from '../../shared/models/usuario';

@Component({
  selector: 'app-cambiarcontrasena',
  templateUrl: './cambiarcontrasena.component.html',
  styleUrls: ['./cambiarcontrasena.component.css']
})
export class CambiarcontrasenaComponent implements OnInit {
  @ViewChild('frmchange', {static: false}) changeForm: NgForm;
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

      this.usuarioService.obtenerUsuarioPorId(this.usuarioId, "administrador").subscribe(usuario => {
        this.usuario = usuario;

      });

    });
  }

  changePass() {
    this.usuario.Pass = this.changeForm.value.contrasena;

    this.usuarioService.cambiarPass(this.usuario).subscribe( usuario => {
      if(usuario != null){
        console.log(usuario);
        this.cambiado = true;
      }else{
        this.error = true;

      }


    },error => {
      this.error = true;

    });
  }
}
