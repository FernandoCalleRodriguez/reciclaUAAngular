import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AccionwebService} from '../../shared/services/accionweb.service';
import {AccionWeb, TipoAccion} from '../../shared/models/accion';
import {TipoaccionService} from '../../shared/services/tipoaccion.service';
import {UsuarioService} from '../../shared/services/usuario.service';
import {Usuario} from '../../shared/models/usuario';
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-accionweb',
  templateUrl: './accionweb.component.html',
  styleUrls: ['./accionweb.component.css']
})
export class AccionwebComponent implements OnInit, OnDestroy {
  accionesWeb: AccionWeb[];
  accionWeb: AccionWeb;
  usuario: Usuario;
  usuarios: Usuario[];
  texto: string;

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private accionwebservice: AccionwebService, protected usuarioservice: UsuarioService,
              protected modalService: NgbModal, protected toaster: ToastrService, protected router: Router) { }

  ngOnInit(): void {
    this.accionwebservice.obtenerTodosAccionWeb().subscribe(acciones => {
      this.accionesWeb = acciones;
      this.texto = (JSON.stringify(acciones));
      console.log('Detalle de la carga de acciones ' + this.texto);
      this.dtTrigger.next();
    }, error => {
      this.router.navigate(['/']);
    });
  }

  public borrarAccionWeb(accion: AccionWeb): void {
    Swal.fire({
      title: '¿Estás seguro de que deseas borrar la acción web ' + accion.Id + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Sí'
    }).then((result) => {
      if (result.value) {
        this.accionwebservice.borrar(accion).subscribe(() => {
          const index = this.accionesWeb.indexOf(accion);
          if (index > -1) {
            this.accionesWeb.splice(index, 1);
          }
          this.toaster.error('Tipo de acción ' + accion.Id + ' borrada');
          this.refresh();
        });
      }
    });
  }

  // Metodo base de modal
  public modalDetalleAccionWeb(accion: AccionWeb, detail) {
    this.accionWeb = accion;
    this.modalService.open(detail, {size: 'xl'});
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
