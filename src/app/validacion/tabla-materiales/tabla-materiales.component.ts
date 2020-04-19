import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ValidacionService} from '../../shared/services/validacion.service';
import {Material} from '../../shared/models/material';
import {Subject} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';
import {TipoContenedor} from '../../shared/models/contenedor';
import {TipoContenedorService} from '../../shared/services/tipo-contenedor.service';
import Swal from "sweetalert2";
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-tabla-materiales',
  templateUrl: './tabla-materiales.component.html',
  styleUrls: ['./tabla-materiales.component.css']
})
export class TablaMaterialesComponent implements OnInit, OnDestroy {
  public materiales: Material[] = null;
  public dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  constructor(protected validacionService: ValidacionService, protected tipoContenedorService: TipoContenedorService,
              protected toaster: ToastrService) {
    validacionService.getAllMaterialesSinValidar().subscribe(m => {
      this.materiales = m;
      this.dtTrigger.next();
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  public getTipoContenedor(id: number): TipoContenedor {
    return this.tipoContenedorService.getTipoById(id);
  }

  validarMaterial(material: Material) {
    this.validacionService.validarMaterial(material).subscribe(() => {
      this.deleteFromArray(this.materiales, material);
      this.toaster.success('Material ' + material.Id + ' validado');
    });
  }

  descartarMaterial(material: Material) {
    Swal.fire({
      title: '¿Estás seguro de que deseas descartar el material ' + material.Id + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.validacionService.descartarMaterial(material).subscribe(() => {
          this.deleteFromArray(this.materiales, material);
          this.toaster.error('Material ' + material.Id + ' descartado');
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
    if (this.materiales) {
      return this.materiales.length;
    }
    return 0;
  }
}
