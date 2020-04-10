import {Component, OnInit} from '@angular/core';
import {UsuarioService} from '../../shared/services/usuario.service';
import {ActivatedRoute} from '@angular/router';
import {Usuario} from '../../shared/models/usuario';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  tipousuario: string;
  usuarioId: string;
  usuario: Usuario;

  constructor(protected route: ActivatedRoute,
              private usuarioService: UsuarioService) {
    this.route.params.subscribe(param => {

      this.tipousuario = param['tipousuario'];
      this.usuarioId = param['usuarioId'];

      this.usuarioService.obtenerUsuarioPorId(this.usuarioId, this.tipousuario).subscribe(usuario => {
        this.usuario = usuario;

      });
    });

  }

  ngOnInit(): void {
  }

}
