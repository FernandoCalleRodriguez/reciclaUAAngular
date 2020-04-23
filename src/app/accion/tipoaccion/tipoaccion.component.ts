import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TipoAccion} from '../../shared/models/accion';
import {TipoaccionService} from '../../shared/services/tipoaccion.service';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';
import Swal from "sweetalert2";
import {ModalNotaComponent} from '../../notainfo/modal-nota/modal-nota.component';
import {ModalTipoaccionComponent} from '../modal-tipoaccion/modal-tipoaccion.component';
import {AutenticacionService} from '../../shared/services/autenticacion.service';
import {DtoptionsService} from '../../shared/services/dtoptions.service';

@Component({
  selector: 'app-tipoaccion',
  templateUrl: './tipoaccion.component.html',
  styleUrls: ['./tipoaccion.component.css']
})
export class TipoaccionComponent implements OnDestroy {
  tipoAcciones: TipoAccion[];
  tipoAccion: TipoAccion;

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();

  edit = false;
  public dtOptions: DataTables.Settings = {};

  constructor(private  tipoaccionservice: TipoaccionService, protected modalService: NgbModal,
              protected toaster: ToastrService, protected router: Router, protected  autenticationService: AutenticacionService,
              protected  dtoptionsService: DtoptionsService) {
    this.autenticationService.estaAutenticado();
    this.dtOptions = this.dtoptionsService.getDtoptions('tipos de acciones web');
    this.tipoaccionservice.obtenerTodosTipoAccion().subscribe(res => {
      this.tipoAcciones = res;
      this.dtTrigger.next();
    });
  }

  public borrarTipoAccion(tipoAccion: TipoAccion): void {
    Swal.fire(this.dtoptionsService.getSwalWarningOptions('el tipo de acción web', tipoAccion.Id)).
    then((result) => {
      if (result.value) {
        this.tipoaccionservice.borrar(tipoAccion).subscribe(() => {
          const index = this.tipoAcciones.indexOf(tipoAccion);
          if (index > -1) {
            this.tipoAcciones.splice(index, 1);
          }
          this.toaster.error('Tipo de acción ' + tipoAccion.Id + ' borrada');
          this.refresh();
        });
      }
    });
  }

  // Metodos base de los modales
  public modalCrearTipoAccion(detail) {
    this.edit = false;
    this.modalService.open(detail, {size: 'xl'});
  }

  public modalModificarTipoAccion(tipoAccion: TipoAccion, detail) {
    this.tipoAccion = tipoAccion;
    this.edit = true;
    this.modalService.open(detail, {size: 'xl'});
  }

  public modalDetalleTipoAccion(tipoAccion: TipoAccion, detail) {
    this.tipoAccion = tipoAccion;
    this.modalService.open(detail, {size: 'xl'});
  }

  // Metodos Submit de modales
  editarSubmit(formNota: ModalTipoaccionComponent, modal: NgbModalRef) {
    formNota.onSubmit().subscribe(d => {
      this.tipoAcciones.forEach((element, i, array) => {
        if (element.Id === d.Id) {
          array[i] = d;
        }
      });
      modal.dismiss();
      this.refresh();
      this.toaster.success('Tipo de acción web ' + d.Id + ' modificada');
    }, error => {
      this.toaster.error('Error al modificar el tipo de acción web');
    });
  }

  crearSubmit(formNota: ModalTipoaccionComponent, modal: NgbModalRef) {
    formNota.onSubmit().subscribe(d => {
      if (!this.tipoAcciones) {
        this.tipoAcciones = [];
      }
      this.tipoAcciones.push(d);
      modal.dismiss();
      this.refresh();
      this.toaster.success('Tipo de acción web ' + d.Id + ' creada');
    }, error => {
      this.toaster.error('Error al crear el tipo de acción web');
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

}
