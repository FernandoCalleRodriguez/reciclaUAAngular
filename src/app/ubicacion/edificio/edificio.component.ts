import { AutenticacionService } from './../../shared/services/autenticacion.service';
import Swal from 'sweetalert2';
import { Edificio } from '../../shared/models/edificio';
import { EdificioService } from '../../shared/services/edificio.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { DtoptionsService } from '../../shared/services/dtoptions.service';

@Component({
  selector: 'app-edificio',
  templateUrl: './edificio.component.html',
  styleUrls: ['./edificio.component.css']
})
export class EdificioComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};

  edificios: Edificio[];
  edificio: Edificio;
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
  dtTrigger: Subject<any> = new Subject<any>();

  isEdit = false;

  constructor(private edificioService: EdificioService, protected dtoptionsService: DtoptionsService, private autenticacionService: AutenticacionService, private toaster: ToastrService) {
    autenticacionService.estaAutenticado();
    this.dtOptions = dtoptionsService.getDtoptions('edificios');
  }

  ngOnInit(): void {
    this.edificioService.getEdificio().subscribe(res => {
      this.edificios = res;
      this.dtTrigger.next();
      //console.log(this.edificios);
    });
    this.edificio = new Edificio();

  }

  getEdificioById(id) {
    this.edificioService.getEdificioById(id).subscribe(res => {
      this.edificio = res;
    });
    console.log(this.edificio);
    this.showModel.nativeElement.click();
    this.isEdit = true;
  }

  add(form) {
    form.reset();
    this.isEdit = false;
    this.edificio = new Edificio();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  delete(id) {
    Swal.fire(this.dtoptionsService.getSwalWarningOptions('el edificio', id))
      .then((result) => {
        if (result.value) {
          this.edificioService.removeEdificio(id).subscribe(res => {
            this.toaster.error('Edificio ' + id + ' borrado');
            this.refresh();
          });
        }
      });
  }

  submit(form: NgForm) {
    if (!this.isEdit) {

      //this.edificio.Id = parseInt(form.value.Id);
      this.edificio.Id = form.value.Id;
      this.edificio.Nombre = form.value.Nombre;

      this.edificioService.setEdificio(this.edificio).subscribe(res => {
        if (res != null) {
          this.closebutton.nativeElement.click();

          this.toaster.success('Edificio ' + res.Id + ' creado');
          this.refresh();
        }
      });
    } else {
      this.edificioService.updateEdificio(this.edificio).subscribe(res => {
        if (res != null) {
          this.closebutton.nativeElement.click();

          //this.toaster.success('Edificio ' + this.edificio.Id + ' modificado');
          this.toaster.success('Edificio ' + res.Id + ' modificado');
          this.refresh();
        }
      });
    }
    form.reset();
  }

  refresh() {
    this.edificioService.getEdificio().subscribe(res => {
      this.edificios = res;

      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next();
      });
    });
  }

}
