import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Respuesta} from '../../shared/models/respuesta';
import {RespuestaService} from '../../shared/services/respuesta.service';
import {DudaService} from '../../shared/services/duda.service';
import {Duda} from '../../shared/models/duda';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import Swal from 'sweetalert2';
import {Subject} from 'rxjs';

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
  public dtTrigger: Subject<any> = new Subject();

  constructor(protected respuestaService: RespuestaService, protected dudaService: DudaService,
              protected router: Router, protected route: ActivatedRoute,
              protected modalService: NgbModal, protected toaster: ToastrService) {
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

  showRespuesta(respuesta: Respuesta, detail) {
    this.respuesta = respuesta;
    this.dudaService.getDudaByRespuesta(respuesta.Id).subscribe(d => {
      this.duda = d;
    });
    this.modalService.open(detail, {size: 'xl'});
  }

  editRespuesta(respuesta: Respuesta) {
    this.dudaService.getDudaByRespuesta(respuesta.Id).subscribe(d => {
      this.router.navigate(['/foro/duda', d.Id, 'respuesta', respuesta.Id, 'modificar']);
    });
  }

  deleteRespuesta(respuesta: Respuesta) {
    Swal.fire({
      title: '¿Estás seguro de que deseas borrar la respuesta ' + respuesta.Id + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.respuestaService.borrar(respuesta).subscribe(() => {
          const index = this.respuestas.indexOf(respuesta);
          if (index > -1) {
            this.respuestas.splice(index, 1);
          }
          this.dtTrigger.next();
          this.toaster.error('Respuesta ' + respuesta.Id + ' borrada');
        });
      }
    });
  }
}
