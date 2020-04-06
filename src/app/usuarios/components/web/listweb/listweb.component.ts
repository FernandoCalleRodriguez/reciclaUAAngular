import { Component, OnInit } from '@angular/core';
import {Usuario} from '../../../../shared/models/Usuario';
import {UsuarioService} from '../../../../shared/services/usuario.service';

@Component({
  selector: 'app-listweb',
  templateUrl: './listweb.component.html',
  styleUrls: ['./listweb.component.css']
})
export class ListwebComponent implements OnInit {

  usuariosweb: Usuario[];

  constructor(private userService: UsuarioService) { }

  ngOnInit(): void {
    /*this.userService.obtenerTodosWeb().subscribe( usuarios =>{
      this.usuariosweb = usuarios;
    });*/
  }

}
