import {Component, OnInit} from '@angular/core';
import {UsuarioService} from '../shared/services/usuario.service';
import {AutenticacionService} from '../shared/services/autenticacion.service';
import {PuntoService} from '../shared/services/punto.service';
import {NivelService} from '../shared/services/nivel.service';
import {DudaService} from '../shared/services/duda.service';
import {Punto} from '../shared/models/punto';
import {Title} from '@angular/platform-browser';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  idusuario: string;
  countUsuarios: number;
  countPuntos: number;
  countNiveles: number;
  countDudas: number;
  puntos: Punto[] = null;

  constructor(private usuarioService: UsuarioService,
              private autenticacionService: AutenticacionService,
              private puntoService: PuntoService,
              private nivelService: NivelService,
              private dudaService: DudaService,
              private titleService: Title) {

    this.autenticacionService.estaAutenticado();
    this.usuarioService.getLoggedUser()?.subscribe(u => {
    }, error => {
      this.autenticacionService.Logout();
    });
    this.titleService.setTitle( 'Inicio' );

  }

  ngOnInit(): void {
    this.obtenerCountCards();
    this.puntoService.getPunto().subscribe(p => {
      this.puntos = p;
    });
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
