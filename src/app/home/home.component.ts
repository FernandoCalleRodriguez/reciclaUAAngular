import {Component, OnInit} from '@angular/core';
import {UsuarioService} from '../shared/services/usuario.service';
import {AutenticacionService} from '../shared/services/autenticacion.service';
import {PuntoService} from '../shared/services/punto.service';
import {NivelService} from '../shared/services/nivel.service';
import {DudaService} from '../shared/services/duda.service';


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


  constructor(private usuarioService: UsuarioService,
              private autenticacionService: AutenticacionService,
              private puntoService: PuntoService,
              private nivelService: NivelService,
              private dudaService: DudaService) {

    this.autenticacionService.estaAutenticado();
    this.usuarioService.getLoggedUser()?.subscribe(u => {
    }, error => {
      this.autenticacionService.Logout();
    });
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
