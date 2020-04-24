import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Nota} from '../../shared/models/nota';
import {NotaService} from '../../shared/services/nota.service';
import {Subject} from 'rxjs';
import {DataTableDirective, DataTablesModule} from 'angular-datatables';
import Swal from 'sweetalert2';
import {not} from 'rxjs/internal-compatibility';
import {ToastrService} from 'ngx-toastr';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {FormNotaComponent} from '../form-nota/form-nota.component';
import {ModalNotaComponent} from '../modal-nota/modal-nota.component';
import {AutenticacionService} from '../../shared/services/autenticacion.service';
import {DtoptionsService} from '../../shared/services/dtoptions.service';

@Component({
  selector: 'app-nota',
  templateUrl: './nota.component.html',
  styleUrls: ['./nota.component.css']
})
export class NotaComponent implements OnDestroy {
  Notas: Nota[];
  Nota: Nota;

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();

  public edit = false;
  public dtOptions: DataTables.Settings = {};

  constructor(private notaservice: NotaService, protected modalService: NgbModal,
              protected toaster: ToastrService, protected router: Router,
              protected  autenticationService: AutenticacionService, protected  dtoptionsService: DtoptionsService) {
    this.autenticationService.estaAutenticado();
    this.dtOptions = this.dtoptionsService.getDtoptions('notas');
    this.notaservice.obtenerTodasNotas().subscribe(res => {
      this.Notas = res;
      this.dtTrigger.next();
    });
  }

  public borrarNota(nota: Nota): void {
    Swal.fire(this.dtoptionsService.getSwalWarningOptions('la nota', nota.Id))
      .then((result) => {
        if (result.value) {
          this.notaservice.borrar(nota).subscribe(() => {
            const index = this.Notas.indexOf(nota);
            if (index > -1) {
              this.Notas.splice(index, 1);
            }
            this.toaster.error('Nota ' + nota.Id + ' borrada');
            this.refresh();
          });
        }
      });
  }

  // Metodos base de los modales
  public modalCrearNota(detail) {
    this.edit = false;
    this.modalService.open(detail, {size: 'xl'});
  }

  public modalModificarNota(nota: Nota, detail) {
    this.Nota = nota;
    this.edit = true;
    this.modalService.open(detail, {size: 'xl'});
  }

  public modalDetalleNota(nota: Nota, detail) {
    this.Nota = nota;
    this.modalService.open(detail, {size: 'xl'});
  }

  // Metodos Submit de modales
  editarSubmit(formNota: ModalNotaComponent, modal: NgbModalRef) {
    formNota.onSubmit().subscribe(d => {
      this.Notas.forEach((element, i, array) => {
        if (element.Id === d.Id) {
          array[i] = d;
        }
      });
      modal.dismiss();
      this.refresh();
      this.toaster.success('Nota ' + d.Id + ' modificada');
    }, error => {
      this.toaster.error('Error al modificar la nota');
    });
  }

  crearSubmit(formNota: ModalNotaComponent, modal: NgbModalRef) {
    formNota.onSubmit().subscribe(d => {
      if (!this.Notas) {
        this.Notas = [];
      }
      this.Notas.push(d);
      modal.dismiss();
      this.refresh();
      this.toaster.success('Nota ' + d.Id + ' creada');
    }, error => {
      this.toaster.error('Error al crear la nota');
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
