import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AccionreciclarService} from '../../shared/services/accionreciclar.service';
import {AccionReciclar, TipoAccion} from '../../shared/models/accion';
import {DataTableDirective} from 'angular-datatables';
import {Observable, Subject} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {UsuarioService} from '../../shared/services/usuario.service';
import {Usuario} from '../../shared/models/usuario';
import {Item} from '../../shared/models/item';
import {TipoContenedorService} from '../../shared/services/tipo-contenedor.service';
import {AutenticacionService} from '../../shared/services/autenticacion.service';
import {DtoptionsService} from '../../shared/services/dtoptions.service';

@Component({
  selector: 'app-accionreciclar',
  templateUrl: './accionreciclar.component.html',
  styleUrls: ['./accionreciclar.component.css']
})
export class AccionreciclarComponent implements OnDestroy {
  accionesRec: AccionReciclar[];
  accionRec: AccionReciclar;
  usuario: Usuario;
  item: Item;


  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();


  public dtOptions: DataTables.Settings = {};

  constructor(private accionrecservice: AccionreciclarService, protected modalService: NgbModal,
              protected toaster: ToastrService, protected router: Router, protected  usuarioService: UsuarioService,
              protected  tipocontenedorservice: TipoContenedorService, protected  autenticationService: AutenticacionService,
              protected  dtoptionsService: DtoptionsService) {
    this.autenticationService.estaAutenticado();
    this.dtOptions = this.dtoptionsService.getDtoptions('acciones de reciclaje');
    this.accionrecservice.obtenerTodosAccionReciclar().subscribe((res: AccionReciclar[]) => {
      this.accionesRec = res;
      this.dtTrigger.next();
    }, error => {
      this.router.navigate(['/']);
    });
  }

  public borrarAccionRec(accion: AccionReciclar): void {
    Swal.fire(this.dtoptionsService.getSwalWarningOptions('la acción de reciclaje', accion.Id))
    .then((result) => {
      if (result.value) {
        this.accionrecservice.borrar(accion).subscribe(() => {
          const index = this.accionesRec.indexOf(accion);
          if (index > -1) {
            this.accionesRec.splice(index, 1);
          }
          this.toaster.error('Acción de reciclaje ' + accion.Id + ' borrada');
          this.refresh();
        });
      }
    });
  }

  // Metodos base de los modales
  public modalDetalleAccionRec(accion: AccionReciclar, detail) {
    this.accionRec = accion;
    this.modalService.open(detail, {size: 'xl'});
  }

  public getContenedor(id: number) {
    return this.tipocontenedorservice.getTipoById(id).Tipo;
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
