import {Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {DudaService} from '../../shared/services/duda.service';
import {Duda} from '../../shared/models/duda';
import {Router} from '@angular/router';
import {TemaService} from '../../shared/services/tema.service';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import {ToastrService} from 'ngx-toastr';
import {Subject} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';
import {FormDudaModalComponent} from '../form-duda-modal/form-duda-modal.component';
import {Tema} from '../../shared/models/tema';

@Component({
  selector: 'app-lista-dudas',
  templateUrl: './lista-dudas.component.html',
  styleUrls: ['./lista-dudas.component.css']
})
export class ListaDudasComponent implements OnInit, OnDestroy {

  public dudas: Duda[] = null;
  public duda: Duda = null;

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();

  public edit = false;

  constructor(protected dudaService: DudaService, protected  temaService: TemaService, protected router: Router,
              protected modalService: NgbModal, protected toaster: ToastrService) {
    dudaService.getAllDudas().subscribe(d => {
      this.dudas = d;
      this.dtTrigger.next();
    });
  }

  public getTema(id: number): string {
    if (id) {
      return this.temaService.getTemaById(id).Tema;
    } else {
      return 'Null';
    }
  }

  public showDuda(duda: Duda, detail) {
    this.duda = duda;
    this.modalService.open(detail, {size: 'xl'});
  }

  ngOnInit(): void {
  }

  deleteDuda(duda: Duda) {
    Swal.fire({
      title: '¿Estás seguro de que deseas borrar la duda ' + duda.Id + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.dudaService.borrar(duda).subscribe(() => {
          const index = this.dudas.indexOf(duda);
          if (index > -1) {
            this.dudas.splice(index, 1);
          }
          this.toaster.error('Duda ' + duda.Id + ' borrada');
          this.refresh();
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

  addDuda(form) {
    this.edit = false;
    this.modalService.open(form, {size: 'xl'});
  }

  crearSubmit(formDuda: FormDudaModalComponent, modal: NgbModalRef) {
    formDuda.onSubmit().subscribe(d => {
      if (!this.dudas) {
        this.dudas = [];
      }
      this.dudas.push(d);
      modal.dismiss();
      this.refresh();
      this.toaster.success('Duda ' + d.Id + ' creada');
    });
  }

  modDuda(duda: Duda, modal) {
    this.duda = duda;
    this.edit = true;
    this.modalService.open(modal, {size: 'xl'});
  }

  editarSubmit(formDuda: FormDudaModalComponent, modal: NgbModalRef) {
    formDuda.onSubmit().subscribe(d => {
      this.dudas.forEach((element, i, array) => {
        if (element.Id === d.Id) {
          array[i] = d;
        }
      });
      modal.dismiss();
      this.refresh();
      this.toaster.success('Duda ' + d.Id + ' modificada');
    });
  }
}
