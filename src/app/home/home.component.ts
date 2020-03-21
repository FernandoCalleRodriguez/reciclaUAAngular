import {Component, OnInit} from '@angular/core';
import {UsuarioService} from '../usuarios/services/usuario.service';
import {Router} from '@angular/router';

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
}
