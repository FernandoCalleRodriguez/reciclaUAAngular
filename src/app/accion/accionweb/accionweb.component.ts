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
import {AutenticacionService} from '../../shared/services/autenticacion.service';
import {DtoptionsService} from '../../shared/services/dtoptions.service';

@Component({
  selector: 'app-accionweb',
  templateUrl: './accionweb.component.html',
  styleUrls: ['./accionweb.component.css']
})
export class AccionwebComponent implements OnDestroy {
  accionesWeb: AccionWeb[];
  accionWeb: AccionWeb;
  usuario: Usuario;
  usuarios: Usuario[];

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();

  public dtOptions: DataTables.Settings = {};

  constructor(private accionwebservice: AccionwebService, protected usuarioservice: UsuarioService,
              protected modalService: NgbModal, protected toaster: ToastrService, protected router: Router,
              protected  autenticationService: AutenticacionService, protected  dtoptionsService: DtoptionsService) {
    this.autenticationService.estaAutenticado();
    this.dtOptions = this.dtoptionsService.getDtoptions('acciones web');
    this.accionwebservice.obtenerTodosAccionWeb().subscribe(acciones => {
      this.accionesWeb = acciones;
      this.dtTrigger.next();
    });
  }

  public borrarAccionWeb(accion: AccionWeb): void {
    Swal.fire(this.dtoptionsService.getSwalWarningOptions('la acción web', accion.Id))
      .then((result) => {
      if (result.value) {
        this.accionwebservice.borrar(accion).subscribe(() => {
          const index = this.accionesWeb.indexOf(accion);
          if (index > -1) {
            this.accionesWeb.splice(index, 1);
          }
          this.toaster.error('Acción web ' + accion.Id + ' borrada');
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
