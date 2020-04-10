import {Component, Input, OnInit} from '@angular/core';
import {Respuesta} from '../../models/respuesta';

@Component({
  selector: 'app-lista-respuestas',
  templateUrl: './lista-respuestas.component.html',
  styleUrls: ['./lista-respuestas.component.css']
})
export class ListaRespuestasComponent implements OnInit {

  @Input() respuestas: Respuesta[] = null;
  constructor() { }

  ngOnInit(): void {
  }

}
