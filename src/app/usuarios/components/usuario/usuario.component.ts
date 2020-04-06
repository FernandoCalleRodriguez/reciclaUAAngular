import {Component, OnInit} from '@angular/core';
import {Usuario} from '../../../shared/models/Usuario';
import {ActivatedRoute} from '@angular/router';
import {UsuarioService} from '../../../shared/services/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  public usuario: Usuario;

  constructor(protected route: ActivatedRoute,
              protected  usuarioService: UsuarioService) {

  }

  ngOnInit(): void {

    this.route.params.subscribe(param => {

      let usuarioID = param['usuarioId'];

      this.usuarioService.obtenerAdminPorId(usuarioID).subscribe(usuario => {
        this.usuario = usuario;
      });

    });

  }

}
