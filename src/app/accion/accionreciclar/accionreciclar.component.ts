import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AccionreciclarService} from '../../shared/services/accionreciclar.service';
import {AccionReciclar, TipoAccion} from '../../shared/models/accion';
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-accionreciclar',
  templateUrl: './accionreciclar.component.html',
  styleUrls: ['./accionreciclar.component.css']
})
export class AccionreciclarComponent implements OnInit, OnDestroy {
  accionesRec: AccionReciclar[];
  accionRec: AccionReciclar;

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private accionrecservice: AccionreciclarService, protected modalService: NgbModal,
              protected toaster: ToastrService, protected router: Router) { }

  ngOnInit(): void {
    this.accionrecservice.obtenerTodosAccionReciclar().subscribe(res => {
      this.accionesRec = res;
      this.dtTrigger.next();
    }, error => {
      this.router.navigate(['/']);
    });
  }

  public borrarAccionRec(accion: AccionReciclar): void {
    Swal.fire({
      title: '¿Estás seguro de que deseas borrar el tipo de acción ' + accion.Id + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Sí'
    }).then((result) => {
      if (result.value) {
        this.accionrecservice.borrar(accion).subscribe(() => {
          const index = this.accionesRec.indexOf(accion);
          if (index > -1) {
            this.accionesRec.splice(index, 1);
          }
          this.toaster.error('Tipo de acción ' + accion.Id + ' borrada');
          this.refresh();
        });
      }
    });
  }

  // Metodos base de los modales
  public modalDetalleAccionRec(accion: AccionReciclar, detail) {
    this.accionRec = accion;
    this.modalService.open(detail, {size: 'xl'});
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
