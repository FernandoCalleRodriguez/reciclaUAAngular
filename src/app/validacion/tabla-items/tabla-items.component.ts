import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Item} from '../../shared/models/item';
import {Subject} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';
import {ValidacionService} from '../../shared/services/validacion.service';
import {TipoContenedorService} from '../../shared/services/tipo-contenedor.service';
import {TipoContenedor} from '../../shared/models/contenedor';

@Component({
  selector: 'app-tabla-items',
  templateUrl: './tabla-items.component.html',
  styleUrls: ['./tabla-items.component.css']
})
export class TablaItemsComponent implements OnInit, OnDestroy {
  public items: Item[] = null;
  public dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  constructor(protected validacionService: ValidacionService) {
    validacionService.getAllItemsSinValidar().subscribe(m => {
      this.items = m;
      this.dtTrigger.next();
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


  validarItem(material: Item) {
    this.validacionService.validarItem(material).subscribe(() => {
      this.deleteFromArray(this.items, material);
    });
  }

  descartarItem(material: Item) {
    this.validacionService.descartarItem(material).subscribe(() => {
      this.deleteFromArray(this.items, material);
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
    if (this.items) {
      return this.items.length;
    }
    return 0;
  }
}
