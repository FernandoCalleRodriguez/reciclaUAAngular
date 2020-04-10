import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UsuarioService} from '../shared/services/usuario.service';

@Component({
  selector: 'app-verificacion',
  templateUrl: './verificacion.component.html',
  styleUrls: ['./verificacion.component.css']
})
export class VerificacionComponent implements OnInit {

  idusuario: string;

  constructor(protected route: ActivatedRoute,
              private usuarioService: UsuarioService) {
  }

  ngOnInit(): void {

    this.route.params.subscribe(param => {

      this.idusuario = param['usuarioId'];

    });
  }

  verificar() {
    this.usuarioService.verificarEmail(this.idusuario).subscribe(result => {
      console.log(result);
    });

  }

}
