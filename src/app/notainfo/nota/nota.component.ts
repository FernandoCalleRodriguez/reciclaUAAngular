import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Nota} from '../../shared/models/nota';
import {NotaService} from '../../shared/services/nota.service';
import {Subject} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';
import Swal from 'sweetalert2';
import {not} from 'rxjs/internal-compatibility';
import {ToastrService} from 'ngx-toastr';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nota',
  templateUrl: './nota.component.html',
  styleUrls: ['./nota.component.css']
})
export class NotaComponent implements OnInit, OnDestroy {
  Notas: Nota[];
  Nota: Nota;

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

  obtenerNotaId() {
    this.notaservice.obtenerNotaPorId(393216).subscribe(nota => {
      this.Nota = nota;
      console.log('Nota por ID' + this.Notas);
    });
  }

  obtenerTodasNotas() {
    this.notaservice.obtenerTodasNotas().subscribe(notas => {
      this.Notas = notas;
      console.log('Obtener todas las notas ' + this.Notas);
    });
  }

  borrarNota(nota: Nota): void {
      Swal.fire({
        title: '¿Estás seguro de que deseas borrar la nota ' + nota.Id + '?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
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

  modificarNota(): void {
    const date: Date = new Date();
    const notaPrueba: Nota = {Id: 425985, Titulo: 'Nota Modificada', Cuerpo: 'Cuerpo nota modificada', Fecha: date};
    console.log(notaPrueba);
    this.notaservice.modificar(notaPrueba).subscribe(res => {
      console.log(res);
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
