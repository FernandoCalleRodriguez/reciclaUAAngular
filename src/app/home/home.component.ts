import {Component, OnInit} from '@angular/core';
import {UsuarioService} from '../shared/services/usuario.service';
import {Router} from '@angular/router';
import {Usuario} from '../shared/models/usuario';
import {AutenticacionService} from '../shared/services/autenticacion.service';
import {PuntoService} from '../shared/services/punto.service';
import {NivelService} from '../shared/services/nivel.service';
import {DudaService} from '../shared/services/duda.service';
import {ValidacionService} from '../shared/services/validacion.service';
import {timer} from 'rxjs';
import {NotaService} from '../shared/services/nota.service';
import {Nota} from '../shared/models/nota';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  idusuario: number;
  countUsuarios = 0;
  countPuntos = 0;
  countNiveles = 0;
  countDudas = 0;


  constructor(private usuarioService: UsuarioService,
              private autenticacionService: AutenticacionService,
              private puntoService: PuntoService,
              private nivelService: NivelService,
              private dudaService: DudaService) {

    this.autenticacionService.estaAutenticado();

  }

  ngOnInit(): void {
    this.obtenerCountCards();
  }


  public obtenerCountCards() {

    this.usuarioService.countUsuariosWeb().subscribe(c => {
      this.countUsuarios = c;
    });

    this.puntoService.countPuntos().subscribe(c => {
      this.countPuntos = c;
    });

    this.nivelService.countNivel().subscribe(c => {
      this.countNiveles = c;
    });

    this.dudaService.countDudas().subscribe(c => {
      this.countDudas = c;
    });

  }

}
