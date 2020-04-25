import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Punto} from '../../shared/models/punto';
import {Subject} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';
import {ValidacionService} from '../../shared/services/validacion.service';
import Swal from 'sweetalert2';
import {ToastrService} from 'ngx-toastr';
import {DtoptionsService} from '../../shared/services/dtoptions.service';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tabla-puntos',
  templateUrl: './tabla-puntos.component.html',
  styleUrls: ['./tabla-puntos.component.css']
})
export class TablaPuntosComponent implements OnInit, OnDestroy {
  public puntos: Punto[] = null;
  public mpunto: Punto = null;
  public dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};

  constructor(protected validacionService: ValidacionService, protected toaster: ToastrService,
              protected dtoptionsService: DtoptionsService, protected modalService: NgbModal) {
    validacionService.getAllPuntosSinValidar().subscribe(m => {
      this.puntos = m;
      this.dtTrigger.next();
    });
    this.dtOptions = dtoptionsService.getDtoptions('puntos');
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  validarPunto(punto: Punto) {
    this.validacionService.validarPunto(punto).subscribe(() => {
      this.deleteFromArray(this.puntos, punto);
      this.toaster.success('Punto ' + punto.Id + ' validado');
    });
  }

  descartarPunto(punto: Punto) {
    Swal.fire(this.dtoptionsService.getSwalWarningOptions('el punto', punto.Id, false, 'descartar'))
      .then((result) => {
        if (result.value) {
          this.validacionService.descartarPunto(punto).subscribe(() => {
            this.deleteFromArray(this.puntos, punto);
            this.toaster.error('Punto ' + punto.Id + ' descartado');
          });
        }
      });
  }

  deleteFromArray(array: any[], element: any): void {
    const index = array.indexOf(element);
    if (index > -1) {
      array.splice(index, 1);
    }
    this.refresh();
  }

  refresh(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  public count(): number {
    if (this.puntos) {
      return this.puntos.length;
    }
    return 0;
  }

  verPunto(punto: Punto, modal: TemplateRef<any>) {
    this.mpunto = punto;
    this.modalService.open(modal, {size: 'xl'});
  }
}
