import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Respuesta} from '../../shared/models/respuesta';
import {RespuestaService} from '../../shared/services/respuesta.service';
import {DudaService} from '../../shared/services/duda.service';
import {Duda} from '../../shared/models/duda';

@Component({
  selector: 'app-respuestas',
  templateUrl: './lista-respuestas.component.html',
  styleUrls: ['./lista-respuestas.component.css']
})
export class ListaRespuestasComponent implements OnInit {
  public respuestas: Respuesta[] = null;
  public respuesta: Respuesta = null;
  public duda: Duda = null;

  constructor(protected route: ActivatedRoute, protected respuestaService: RespuestaService, protected dudaService: DudaService) {
    this.route.params.subscribe(params => {
      if (params.dudaId) {
        respuestaService.getRespuestasByDuda(params.dudaId).subscribe(respuestas => {
          this.respuestas = respuestas;
        });
      } else {
        respuestaService.getAllRespuestas().subscribe(respuestas => {
          this.respuestas = respuestas;
        });
      }
    });
  }

  ngOnInit(): void {
  }

  showRespuesta(respuesta: Respuesta) {
    this.respuesta = respuesta;
    this.dudaService.getDudaByRespuesta(respuesta.Id).subscribe(d => {
      this.duda = d;
    });
  }

  editRespuesta(respuesta: Respuesta) {
    
  }
}
