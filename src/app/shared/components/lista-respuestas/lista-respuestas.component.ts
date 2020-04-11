import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Respuesta} from '../../models/respuesta';

@Component({
  selector: 'app-lista-respuestas',
  templateUrl: './lista-respuestas.component.html',
  styleUrls: ['./lista-respuestas.component.css']
})
export class ListaRespuestasComponent implements OnInit {

  @Input() respuestas: Respuesta[] = null;
  @Output() output: EventEmitter<Respuesta> = new EventEmitter<Respuesta>();
  constructor() { }

  ngOnInit(): void {
  }

  returnRespuesta(respuesta: Respuesta) {
    this.output.emit(respuesta);
  }
}
