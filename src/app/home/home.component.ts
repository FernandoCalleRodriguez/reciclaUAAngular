import {Component, OnInit} from '@angular/core';
import {UsuarioService} from '../shared/services/usuario.service';
import {Router} from '@angular/router';
import {Usuario} from '../shared/models/usuario';
import {AutenticacionService} from '../shared/services/autenticacion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  idusuario: string;

  constructor(private usuarioService: UsuarioService,
              private autenticacionService: AutenticacionService) {
    this.usuarioService.getLoggedUser()?.subscribe(u => {
    }, error => {
      this.autenticacionService.Logout();
    });
  }

  ngOnInit(): void {

  }


}
