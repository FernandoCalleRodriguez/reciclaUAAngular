import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AutenticacionService} from '../../services/autenticacion.service';
import {Usuario} from '../../models/usuario';
import {UsuarioService} from '../../services/usuario.service';
import {timer} from 'rxjs';
import {ValidacionService} from '../../services/validacion.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public usuario: Usuario = new Usuario();
  public toggle = false;
  private notifier = timer(1000);
  public notificacionesItems = 0;
  public notificacionesPuntos = 0;
  public notificacionesMateriales = 0;

  constructor(private autenticacionService: AutenticacionService,
              protected usuarioService: UsuarioService,
              protected validacionService: ValidacionService, public router: Router) {
    //this.autenticacionService.estaAutenticado();
    this.router.events.subscribe(value => {
      this.usuarioService.getLoggedUser()?.subscribe(u => {
        this.usuario = u;
      }, error => {
        this.autenticacionService.Logout();
      });
    });
  }

  ngOnInit(): void {
    this.toggle = false;
    this.notifier = timer(0);
    this.notify();
  }

  logout() {
    this.autenticacionService.Logout();
  }

  notify() {
    this.notifier.subscribe(value => {
      this.validacionService.countAllItemsSinValidar().subscribe(c => {
        this.notificacionesItems = c;
      });
      this.validacionService.countAllPuntosSinValidar().subscribe(c => {
        this.notificacionesPuntos = c;
      });
      this.validacionService.countAllMaterialesSinValidar().subscribe(c => {
        this.notificacionesMateriales = c;
      });
      this.notifier = timer(1000);
      this.notify();
    });
  }

  get checkValidations(): boolean {
    return this.notificacionesItems + this.notificacionesPuntos + this.notificacionesMateriales > 0;
  }
}
