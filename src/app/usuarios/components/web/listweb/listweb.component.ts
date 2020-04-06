import {Component, OnInit} from '@angular/core';
import {Usuario} from '../../../../shared/models/Usuario';
import {UsuarioService} from '../../../../shared/services/usuario.service';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';

@Component({
  selector: 'app-listweb',
  templateUrl: './listweb.component.html',
  styleUrls: ['./listweb.component.css']
})
export class ListwebComponent implements OnInit {

  usuariosweb: Usuario[];

  constructor(private userService: UsuarioService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.userService.obtenerTodosWeb().subscribe(usuarios => {
      this.usuariosweb = usuarios;
      console.log(usuarios);
    });
  }

  borrarUsuario(id) {
    this.userService.borrarWeb(id).subscribe(res => {
      //Notificar borrado
    });
  }

  modificarUsuario(id) {
    this.router.navigate(['../modificar-web/' + id]);
  }

}
