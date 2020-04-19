import {AfterViewChecked, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Respuesta} from '../../shared/models/respuesta';
import {RespuestaService} from '../../shared/services/respuesta.service';
import {DudaService} from '../../shared/services/duda.service';
import {Duda} from '../../shared/models/duda';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import Swal from 'sweetalert2';
import {Subject} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';
import {FormRespuestaModalComponent} from '../form-respuesta-modal/form-respuesta-modal.component';

@Component({
  selector: 'app-respuestas',
  templateUrl: './lista-respuestas.component.html',
  styleUrls: ['./lista-respuestas.component.css']
})
export class ListaRespuestasComponent implements OnInit, OnDestroy {
  public respuestas: Respuesta[] = null;
  public respuesta: Respuesta = null;
  public duda: Duda = null;
  public dudaId: number = null;

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  public dtTrigger: Subject<any> = new Subject();

  public edit = false;

  constructor(protected respuestaService: RespuestaService, protected dudaService: DudaService,
              protected router: Router, protected route: ActivatedRoute,
              protected modalService: NgbModal, protected toaster: ToastrService) {
    this.route.params.subscribe(params => {
      if (params.dudaId) {
        this.dudaId = params.dudaId;
        respuestaService.getRespuestasByDuda(params.dudaId).subscribe(respuestas => {
          this.respuestas = respuestas;
          this.dtTrigger.next();
        });
      } else {
        respuestaService.getAllRespuestas().subscribe(respuestas => {
          this.respuestas = respuestas;
          this.dtTrigger.next();
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
          this.refresh();
          this.toaster.error('Respuesta ' + respuesta.Id + ' borrada');
        });
      }
    });
  }

  refresh() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  addRespuesta(form) {
    this.edit = false;
    this.modalService.open(form, {size: 'xl'});
  }

  crearSubmit(formRespuesta: FormRespuestaModalComponent, modal: NgbModalRef) {
    formRespuesta.onSubmit().subscribe(r => {
      if (!this.respuestas) {
        this.respuestas = [];
      }
      this.respuestas.push(r);
      modal.dismiss();
      this.refresh();
      this.toaster.success('Respuesta ' + r.Id + ' creada');
    });
  }

  modRespuesta(respuesta: Respuesta, modal) {
    this.dudaService.getDudaByRespuesta(respuesta.Id).subscribe(d => {
      this.duda = d;
      this.respuesta = respuesta;
      this.edit = true;
      this.modalService.open(modal, {size: 'xl'});
    });
  }

  editarSubmit(formRespuesta: FormRespuestaModalComponent, modal: NgbModalRef) {
    formRespuesta.onSubmit().subscribe(r => {
      this.respuestas.forEach((element, i, array) => {
        if (element.Id === r.Id) {
          array[i] = r;
        }
      });
      modal.dismiss();
      this.refresh();
      this.toaster.success('Respuesta ' + r.Id + ' modificada');
    });
  }
}
