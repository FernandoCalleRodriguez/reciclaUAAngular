import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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
  public dudaId: number = null;

  constructor(protected respuestaService: RespuestaService, protected dudaService: DudaService,
              protected router: Router, protected route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      if (params.dudaId) {
        this.dudaId = params.dudaId;
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
    this.dudaService.getDudaByRespuesta(respuesta.Id).subscribe(d => {
      this.router.navigate(['/foro/duda', d.Id, 'respuesta', respuesta.Id, 'modificar']);
    });
  }
}
