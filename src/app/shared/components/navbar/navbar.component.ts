import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AutenticacionService} from '../../services/autenticacion.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  idusuario;


  constructor(private autenticacionService: AutenticacionService,
              protected  router: Router) {
    this.autenticacionService.estaAutenticado();
    this.idusuario = this.autenticacionService.getID();
  }

  ngOnInit(): void {
  }

  logout() {
    this.autenticacionService.Logout();
  }
}
