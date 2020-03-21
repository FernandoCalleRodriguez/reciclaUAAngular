import {Component, OnInit} from '@angular/core';
import {UsuarioService} from '../usuarios/services/usuario.service';
import {Router} from '@angular/router';
import {Usuario} from '../usuarios/models/Usuario';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UsuarioService,
              private router: Router
  ) {
  }

  ngOnInit(): void {
    this.obtenerUsuarioPorEmail();
  }

  logout() {
    this.userService.Logout();
    this.router.navigate(['']);
  }

  damePuntos() {
    this.userService.damePuntos().subscribe(
      data => {
        console.log('Obtenidos puntos');
      }, error => {
        console.log('Obtención fallida');
      }
    );

  }

  borrarUsuario() {
    this.userService.Borrado().subscribe(
      data => {
        console.log('Usuario eliminado');
        this.router.navigate(['']);
      }, error => {
        console.log('Eliminación fallida', error);
      }
    );
  }

  obtenerUsuarioPorEmail() {
    this.userService.obtenerUsusarioPorEmail().subscribe(
      data => {
      }, error => {
        console.log('Obtenicion fallida', error);
      }
    );
  }
}
