import { Component, OnInit } from '@angular/core';
import {UsuarioService} from '../../services/usuario.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(/*protected  userService: UsuarioService,*/
              protected  router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    localStorage.removeItem('ACESS_TOKEN');
    this.router.navigate(['']);
  }
}
