import {Component, OnInit} from '@angular/core';
import {UsuarioService} from '../shared/services/usuario.service';
import {Router} from '@angular/router';
import {Usuario} from '../shared/models/Usuario';

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


  /*borrarUsuario() {
    this.userService.Borrado().subscribe(
      data => {
        console.log('Usuario eliminado');
        this.router.navigate(['']);
      }, error => {
        console.log('Eliminación fallida', error);
      }
    );
  }*/


}
