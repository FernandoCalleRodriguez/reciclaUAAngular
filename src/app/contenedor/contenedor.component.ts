import {TipoContenedorService} from './../shared/services/tipo-contenedor.service';
import {TipoContenedor} from './../shared/models/contenedor';
import {AutenticacionService} from './../shared/services/autenticacion.service';
import Swal from 'sweetalert2';
import {Contenedor} from '../shared/models/contenedor';
import {ContenedorService} from '../shared/services/contenedor.service';
import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Punto} from '../shared/models/punto';
import {PuntoService} from '../shared/services/punto.service';
import {Subject} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';
import {DtoptionsService} from '../shared/services/dtoptions.service';

@Component({
  selector: 'app-contenedor',
  templateUrl: './contenedor.component.html',
  styleUrls: ['./contenedor.component.css']
})
export class ContenedorComponent implements OnInit, OnDestroy {

  contenedores: Contenedor[];
  contenedor: Contenedor;

  punto: Punto[];

  public tipos: TipoContenedor[] = null;

  @ViewChild('closebutton')
  closebutton: {
    nativeElement: {
      click: () => void;
    };
  };
  @ViewChild('showModel')
  showModel: {
    nativeElement: {
      click: () => void;
    };
  };
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject<any>();
  isEdit = false;

  constructor(private contenedorService: ContenedorService, public puntoService: PuntoService,
              private autenticacionService: AutenticacionService, public tipoService: TipoContenedorService,
              protected dtoptionsService: DtoptionsService, private toaster: ToastrService) {
    this.tipos = tipoService.getTipos();
    autenticacionService.estaAutenticado();
    this.dtOptions = dtoptionsService.getDtoptions('contenedor');
  }

  ngOnInit(): void {
    this.contenedorService.getContenedor().subscribe(res => {
      this.contenedores = res;
      this.dtTrigger.next();
      //console.log(this.contenedores);
    });
    this.contenedor = new Contenedor();
    this.puntoService.getPunto().subscribe(res => this.punto = res);

  }

  getContenedorById(id) {
    this.contenedorService.getContenedorById(id).subscribe(res => {
      this.contenedor = res;
      //this.contenedor.Punto_oid = res?.PuntoContenedor.Id;
    });
    console.log('contenedor;', this.contenedor);
    this.showModel.nativeElement.click();
    this.isEdit = true;
  }

  add(form) {
    form.reset();
    this.isEdit = false;
    this.contenedor = new Contenedor();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  delete(id) {
    Swal.fire(this.dtoptionsService.getSwalWarningOptions('el contenedor', id)).then((result) => {
      if (result.value) {
        this.contenedorService.removeContenedor(id).subscribe(res => {
          this.refresh();
          this.toaster.error('Contenedor ' + id + ' borrado');
        });
      }
    });
  }

  submit(form: NgForm) {
    if (!this.isEdit) {

      this.contenedor.Tipo = form.value.Tipo;

      this.contenedor.Punto_oid = form.value.Punto;
      this.contenedorService.setContenedor(this.contenedor).subscribe(res => {
        if (res != null) {
          this.closebutton.nativeElement.click();

          this.toaster.success('Contenedor ' + res.Id + ' creado');
          this.refresh();
        }
      });
    } else {
      //console.log("n", this.contenedor);
      this.contenedorService.updateContenedor(this.contenedor).subscribe(res => {
        if (res != null) {
          this.closebutton.nativeElement.click();

          this.toaster.success('Contenedor ' + this.contenedor.Id + ' modificado');
          this.refresh();
        }
      });
    }
    form.reset();
  }

  refresh() {
    this.contenedorService.getContenedor().subscribe(res => {
      this.contenedores = res;

      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next();
      });
    });

  }

  mapPuntoChange(punto: Punto, form: NgForm) {
    form.controls['Punto'].setValue(punto.Id);
  }

}
