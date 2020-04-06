import {Component, OnInit} from '@angular/core';
import {Usuario} from '../../../../shared/models/Usuario';
import {UsuarioService} from '../../../../shared/services/usuario.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-listadmin',
  templateUrl: './listadmin.component.html',
  styleUrls: ['./listadmin.component.css']
})
export class ListadminComponent implements OnInit {

  usuariosadmin: Usuario[];

  constructor(private userService: UsuarioService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.userService.obtenerTodosAdmin().subscribe(usuarios => {
      this.usuariosadmin = usuarios;
    });
  }

}
