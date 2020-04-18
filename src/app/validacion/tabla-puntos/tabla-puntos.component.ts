import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Punto} from '../../shared/models/punto';
import {Subject} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';
import {ValidacionService} from '../../shared/services/validacion.service';

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

  constructor(protected validacionService: ValidacionService) {
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


  validarPunto(material: Punto) {
    this.validacionService.validarPunto(material).subscribe(() => {
      this.deleteFromArray(this.puntos, material);
    });
  }

  descartarPunto(material: Punto) {
    this.validacionService.descartarPunto(material).subscribe(() => {
      this.deleteFromArray(this.puntos, material);
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
