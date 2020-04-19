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

@Component({
  selector: 'app-tipoaccion',
  templateUrl: './tipoaccion.component.html',
  styleUrls: ['./tipoaccion.component.css']
})
export class TipoaccionComponent implements OnInit, OnDestroy {
  tipoAcciones: TipoAccion[];
  tipoAccion: TipoAccion;
  edit = false;

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private  tipoaccionservice: TipoaccionService, protected modalService: NgbModal,
              protected toaster: ToastrService, protected router: Router) { }

  ngOnInit(): void {
    this.tipoaccionservice.obtenerTodosTipoAccion().subscribe(res => {
      this.tipoAcciones = res;
      this.dtTrigger.next();
    }, error => {
      this.router.navigate(['/']);
    });
  }

  public borrarTipoAccion(tipoAccion: TipoAccion): void {
    Swal.fire({
      title: '¿Estás seguro de que deseas borrar el tipo de acción ' + tipoAccion.Id + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Sí'
    }).then((result) => {
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
