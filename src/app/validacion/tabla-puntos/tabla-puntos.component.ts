import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Punto} from '../../shared/models/punto';
import {Subject} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';
import {ValidacionService} from '../../shared/services/validacion.service';
import Swal from "sweetalert2";
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-tabla-puntos',
  templateUrl: './tabla-puntos.component.html',
  styleUrls: ['./tabla-puntos.component.css']
})
export class TablaPuntosComponent implements OnInit, OnDestroy {
  public puntos: Punto[] = null;
  public dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  constructor(protected validacionService: ValidacionService, protected toaster: ToastrService) {
    validacionService.getAllPuntosSinValidar().subscribe(m => {
      this.puntos = m;
      this.dtTrigger.next();
    });
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
    Swal.fire({
      title: '¿Estás seguro de que deseas descartar el punto ' + punto.Id + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
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
}