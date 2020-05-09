import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UsuarioService} from '../shared/services/usuario.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-verificacion',
  templateUrl: './verificacion.component.html',
  styleUrls: ['./verificacion.component.css']
})
export class VerificacionComponent implements OnInit {

  idusuario: string;

  constructor(protected route: ActivatedRoute,
              private usuarioService: UsuarioService,
              private toaster: ToastrService) {
  }

  ngOnInit(): void {

    this.route.params.subscribe(param => {

      this.idusuario = param['usuarioId'];

    });
  }

  verificar() {
    this.usuarioService.verificarEmail(this.idusuario).subscribe(result => {
      this.toaster.success(' El email ha sido verificado con éxito');

    }, error => {
      this.toaster.error(' El email no ha podido ser verificado vuelva a intentarlo');

    });

  }

}
