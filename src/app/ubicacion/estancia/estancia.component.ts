import { AutenticacionService } from './../../shared/services/autenticacion.service';
import { Planta } from '../../shared/models/planta';
import { Edificio } from '../../shared/models/edificio';
import { EdificioService } from '../../shared/services/edificio.service';
import { PlantaService } from '../../shared/services/planta.service';

import Swal from 'sweetalert2';
import { Estancia } from '../../shared/models/estancia';
import { EstanciaService } from '../../shared/services/estancia.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { DtoptionsService } from '../../shared/services/dtoptions.service';

@Component({
  selector: 'app-estancia',
  templateUrl: './estancia.component.html',
  styleUrls: ['./estancia.component.css']
})
export class EstanciaComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};

  estancias: Estancia[];
  estancia: Estancia;

  edificio: Edificio[];
  planta: Planta[];

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

  dtTrigger: Subject<any> = new Subject();

  isEdit = false;

  constructor(private estanciaService: EstanciaService,
    private plantaService: PlantaService, private edificioService: EdificioService,
    protected dtoptionsService: DtoptionsService, private autenticacionService: AutenticacionService,
    private toaster: ToastrService) {
    autenticacionService.estaAutenticado();
    this.dtOptions = dtoptionsService.getDtoptions('estancias');
  }

  ngOnInit(): void {
    this.estanciaService.getEstancia().subscribe(res => {
      this.estancias = res;
      this.dtTrigger.next();

    });
    this.estancia = new Estancia();
    this.edificioService.getEdificio().subscribe(res => this.edificio = res);
    this.plantaService.getPlanta().subscribe(res => this.planta = res);

  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getEstanciaById(id) {
    this.estanciaService.getEstanciaById(id).subscribe(res => {

      this.estancia = res;
      this.estancia.Edificio_oid = res?.EdificioEstancia.Id;
      this.estancia.Planta_oid = res?.PlantaEstancia.Id;
    });

    this.showModel.nativeElement.click();
    this.isEdit = true;
  }

  add(form) {
    form.reset();
    this.isEdit = false;
    this.estancia = new Estancia();
  }

  delete(id) {
    Swal.fire(this.dtoptionsService.getSwalWarningOptions('la estancia', id))
      .then((result) => {
        if (result.value) {
          this.estanciaService.removeEstancia(id).subscribe(res => {
            this.toaster.error('Estancia ' + id + ' borrada');
            this.refresh();
          });
        }
      });
  }

  submit(form: NgForm) {
    if (!this.isEdit) {

      this.estancia.Id = form.value.Id;
      this.estancia.Actividad = form.value.Actividad;
      this.estancia.Latitud = form.value.Latitud;
      this.estancia.Longitud = form.value.Longitud;
      this.estancia.Nombre = form.value.Nombre;

      this.estancia.Edificio_oid = form.value.Edificio;
      this.estancia.Planta_oid = form.value.Planta;

      this.estanciaService.setEstancia(this.estancia).subscribe(res => {
        if (res != null) {
          this.closebutton.nativeElement.click();

          this.refresh();
          this.toaster.success('Estancia ' + res.Id + ' creada');
        }
      });
    }
    else {
      this.estanciaService.updateEstancia(this.estancia).subscribe(res => {
        if (res != null) {
          this.closebutton.nativeElement.click();
          this.toaster.success('Estancia "' + res.Id + '" modificada');
          this.refresh();
        }
      });
    }
    form.reset();
  }

  refresh() {
    this.estanciaService.getEstancia().subscribe(res => {
      this.estancias = res;

      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next();
      });
    });
  }

}
