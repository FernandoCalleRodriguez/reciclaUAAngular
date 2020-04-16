import {Component, OnInit} from '@angular/core';
import {DudaService} from '../../shared/services/duda.service';
import {Duda} from '../../shared/models/duda';
import {Router} from '@angular/router';
import {TemaService} from '../../shared/services/tema.service';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import {ToastrService} from 'ngx-toastr';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-lista-dudas',
  templateUrl: './lista-dudas.component.html',
  styleUrls: ['./lista-dudas.component.css']
})
export class ListaDudasComponent implements OnInit {

  public dudas: Duda[] = null;
  public duda: Duda = null;
  public dtTrigger: Subject<any> = new Subject();

  constructor(protected dudaService: DudaService, protected  temaService: TemaService, protected router: Router,
              protected modalService: NgbModal, protected toaster: ToastrService) {
    dudaService.getAllDudas().subscribe(d => {
      this.dudas = d;
    }, error => {
      router.navigate(['/']);
    });
  }

  public getTema(id: number): string {
    return this.temaService.getTemaById(id).Tema;
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
          this.dtTrigger.next();
          this.toaster.error('Duda ' + duda.Id + ' borrada');
        });
      }
    });
  }
}
