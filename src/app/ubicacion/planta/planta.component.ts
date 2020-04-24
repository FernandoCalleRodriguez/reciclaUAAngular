import { AutenticacionService } from './../../shared/services/autenticacion.service';
import Swal from 'sweetalert2';
import { Planta } from '../../shared/models/planta';
import { PlantaService } from '../../shared/services/planta.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Edificio } from '../../shared/models/edificio';
import { EdificioService } from '../../shared/services/edificio.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { DtoptionsService } from '../../shared/services/dtoptions.service';

@Component({
  selector: 'app-planta',
  templateUrl: './planta.component.html',
  styleUrls: ['./planta.component.css']
})
export class PlantaComponent implements OnInit, OnDestroy {

  plantas: Planta[];
  planta: Planta;

  edificio: Edificio[];

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
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  isEdit = false;

  constructor(private plantaService: PlantaService, protected dtoptionsService: DtoptionsService, private autenticacionService: AutenticacionService, private edificioService: EdificioService, private toaster: ToastrService) {
    autenticacionService.estaAutenticado();
    this.dtOptions = dtoptionsService.getDtoptions('planta');
  }

  ngOnInit(): void {
    this.plantaService.getPlanta().subscribe(res => {
      this.plantas = res;
      this.dtTrigger.next();
    });

    this.planta = new Planta();
    this.edificioService.getEdificio().subscribe(res => this.edificio = res);

  }

  getPlantaById(id) {
    this.plantaService.getPlantaById(id).subscribe(res => {
      this.planta = res;
      // this.planta.Edificio_oid = res?.EdificioPlanta.Id;

    });
    //console.log(this.planta);
    this.showModel.nativeElement.click();
    this.isEdit = true;
  }

  add(form) {
    form.reset();
    this.isEdit = false;
    this.planta = new Planta();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  delete(id) {
    Swal.fire(this.dtoptionsService.getSwalWarningOptions('la planta', id))
      .then((result) => {
        if (result.value) {
          this.plantaService.removePlanta(id).subscribe(res => {
            this.toaster.error('Planta ' + id + ' borrada');
            this.refresh();
          });
        }
      });
  }

  submit(form: NgForm) {
    if (!this.isEdit) {

      this.planta.Planta = form.value.Planta;
      this.planta.Edificio_oid = form.value.Edificio;

      this.plantaService.setPlanta(this.planta).subscribe(res => {
        if (res != null) {
          this.closebutton.nativeElement.click();

          this.toaster.success('Planta ' + res.Id + ' creada');
          this.refresh();
        }
      });
    }
    else {
      this.plantaService.updatePlanta(this.planta).subscribe(res => {
        if (res != null) {
          this.closebutton.nativeElement.click();

          this.toaster.success('Planta ' + this.planta.Id + ' modificada');
          this.refresh();
        }
      });
    }
    form.reset();
  }

  refresh() {
    this.plantaService.getPlanta().subscribe(res => {
      this.plantas = res;

      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next();
      });
    });
  }

}
