import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Nota} from '../../shared/models/nota';
import {NotaService} from '../../shared/services/nota.service';
import {Subject} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';
import Swal from 'sweetalert2';
import {not} from 'rxjs/internal-compatibility';
import {ToastrService} from 'ngx-toastr';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {FormNotaComponent} from '../form-nota/form-nota.component';
import {ModalNotaComponent} from '../modal-nota/modal-nota.component';

@Component({
  selector: 'app-nota',
  templateUrl: './nota.component.html',
  styleUrls: ['./nota.component.css']
})
export class NotaComponent implements OnInit, OnDestroy {
  Notas: Nota[];
  Nota: Nota;
  edit = false;

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private notaservice: NotaService, protected modalService: NgbModal,
              protected toaster: ToastrService, protected router: Router) { }

  ngOnInit(): void {
    this.notaservice.obtenerTodasNotas().subscribe(res => {
      this.Notas = res;
      this.dtTrigger.next();
    }, error => {
      this.router.navigate(['/']);
    });
  }

  public  obtenerNotaId() {
    this.notaservice.obtenerNotaPorId(393216).subscribe(nota => {
      this.Nota = nota;
      console.log('Nota por ID' + this.Notas);
    });
  }

  public  obtenerTodasNotas() {
    this.notaservice.obtenerTodasNotas().subscribe(notas => {
      this.Notas = notas;
      console.log('Obtener todas las notas ' + this.Notas);
    });
  }

  public borrarNota(nota: Nota): void {
      Swal.fire({
        title: '¿Estás seguro de que deseas borrar la nota ' + nota.Id + '?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Sí'
      }).then((result) => {
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

  public modificarNota(): void {
    const date: Date = new Date();
    const notaPrueba: Nota = {Id: 425985, Titulo: 'Nota Modificada', Cuerpo: 'Cuerpo nota modificada', Fecha: date};
    console.log(notaPrueba);
    this.notaservice.modificar(notaPrueba).subscribe(res => {
      console.log(res);
    });
  }

  //Metodos base de los modales
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

  //Metodos Submit de modales
  editarSubmit(formNota: ModalNotaComponent, modal: NgbModalRef) {
    formNota.onSubmit().subscribe(d => {
      this.Notas.forEach((element, i, array) => {
        if (element.Id === d.Id) {
          array[i] = d;
        }
      });
      modal.dismiss();
      this.refresh();
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
