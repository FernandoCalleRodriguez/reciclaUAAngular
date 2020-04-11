import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Respuesta} from '../../shared/models/respuesta';
import {RespuestaService} from '../../shared/services/respuesta.service';

@Component({
  selector: 'app-respuestas',
  templateUrl: './respuestas.component.html',
  styleUrls: ['./respuestas.component.css']
})
export class RespuestasComponent implements OnInit {
  public respuestas: Respuesta[] = null;
  public respuesta: Respuesta = null;

  constructor(protected route: ActivatedRoute, protected respuestaService: RespuestaService) {
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
  }
}
