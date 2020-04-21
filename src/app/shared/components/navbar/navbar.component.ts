import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AutenticacionService} from '../../services/autenticacion.service';
import {Usuario} from '../../models/usuario';
import {UsuarioService} from '../../services/usuario.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public usuario: Usuario = new Usuario();

  constructor(private autenticacionService: AutenticacionService, protected usuarioService: UsuarioService, public router: Router) {
    this.autenticacionService.estaAutenticado();
    this.usuario.Id = parseInt(this.autenticacionService.getID());
  }

  ngOnInit(): void {
    this.usuarioService.getLoggedUser()?.subscribe(u => {
      this.usuario = u;
    });
  }

  logout() {
    this.autenticacionService.Logout();
  }
}
