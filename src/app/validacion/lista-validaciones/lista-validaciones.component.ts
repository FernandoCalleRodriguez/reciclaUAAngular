import {Component, OnInit} from '@angular/core';
import {ValidacionService} from '../../shared/services/validacion.service';
import {Material} from '../../shared/models/material';
import {Punto} from '../../shared/models/punto';
import {Item} from '../../shared/models/item';
import {TipoContenedorService} from '../../shared/services/tipo-contenedor.service';
import {TipoContenedor} from '../../shared/models/contenedor';
import {Subject, SubjectSubscriber} from 'rxjs/internal/Subject';

@Component({
  selector: 'app-lista-validaciones',
  templateUrl: './lista-validaciones.component.html',
  styleUrls: ['./lista-validaciones.component.css']
})
export class ListaValidacionesComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
