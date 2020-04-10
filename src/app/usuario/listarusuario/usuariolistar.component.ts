import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Usuario} from '../../shared/models/usuario';
import {UsuarioService} from '../../shared/services/usuario.service';

@Component({
  selector: 'app-usuariolistar',
  templateUrl: './usuariolistar.component.html',
  styleUrls: ['./usuariolistar.component.css']
})
export class UsuariolistarComponent implements OnInit {

  tipousuario: string; // web o admin
  usuariosweb: Usuario[];


  constructor(protected route: ActivatedRoute,
              private usuarioService: UsuarioService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(param => {

      this.tipousuario = param['tipousuario'];

      this.usuarioService.obtenerUsuarios(this.tipousuario).subscribe(usuarios => {
        this.usuariosweb = usuarios;
        console.log(usuarios);
      });
    });


  }

  borrarUsuario(id) {
    this.usuarioService.borrarUsuario(id, this.tipousuario).subscribe(res => {
      this.router.navigate(['/listarusuario/' + this.tipousuario]);
    });
  }

  modificarUsuario(id) {
    this.router.navigate(['/modificarusuario/' + this.tipousuario + '/' + id]);
  }

}
