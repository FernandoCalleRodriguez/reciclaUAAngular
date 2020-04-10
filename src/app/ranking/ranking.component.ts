import {Component, OnInit} from '@angular/core';
import {UsuarioService} from '../shared/services/usuario.service';
import {Usuario} from '../shared/models/usuario';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  usuarios: Usuario[];
  contador: number;

  constructor(private usuarioService: UsuarioService) {
    this.usuarioService.obtenerRanking().subscribe(usuarios => {
      this.usuarios = usuarios;
    });
  }

  ngOnInit(): void {
  }

}
