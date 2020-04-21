import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Item} from '../../shared/models/item';
import {Subject} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';
import {ValidacionService} from '../../shared/services/validacion.service';
import {TipoContenedorService} from '../../shared/services/tipo-contenedor.service';
import {TipoContenedor} from '../../shared/models/contenedor';
import Swal from "sweetalert2";
import {ToastrService} from 'ngx-toastr';

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

  constructor(protected validacionService: ValidacionService, protected toaster: ToastrService) {
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


  validarItem(item: Item) {
    this.validacionService.validarItem(item).subscribe(() => {
      this.deleteFromArray(this.items, item);
      this.toaster.success('Item ' + item.Id + ' validado');
    });
  }

  descartarItem(item: Item) {
    Swal.fire({
      title: '¿Estás seguro de que deseas descartar el item ' + item.Id + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.validacionService.descartarItem(item).subscribe(() => {
          this.deleteFromArray(this.items, item);
          this.toaster.error('Item ' + item.Id + ' descartado');
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
    if (this.items) {
      return this.items.length;
    }
    return 0;
  }
}