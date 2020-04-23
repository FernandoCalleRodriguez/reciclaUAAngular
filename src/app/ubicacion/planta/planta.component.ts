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

@Component({
  selector: 'app-planta',
  templateUrl: './planta.component.html',
  styleUrls: ['./planta.component.css']
})
export class PlantaComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};

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
  dtTrigger: Subject<any> = new Subject<any>();

  isEdit = false;
  constructor(private plantaService: PlantaService, private autenticacionService: AutenticacionService, private edificioService: EdificioService, private toaster: ToastrService) {
    autenticacionService.estaAutenticado();
  }

  ngOnInit(): void {
    this.plantaService.getPlanta().subscribe(res => {
      this.plantas = res;
      this.dtTrigger.next();

    });
    this.planta = new Planta();
    this.edificioService.getEdificio().subscribe(res => this.edificio = res);

    this.dtOptions = {
      'language': {
        'decimal': '',
        'emptyTable': 'No hay plantas disponibles en la tabla',
        'info': 'Mostrando _START_ hasta _END_ de _TOTAL_ plantas en total',
        'infoEmpty': 'Mostrando 0 hasta 0 de 0 plantas',
        'infoFiltered': '(filtrado de _MAX_ plantas en total)',
        'infoPostFix': '',
        'thousands': ',',
        'lengthMenu': 'Mostar _MENU_ plantas por página',
        'loadingRecords': 'Cargando...',
        'processing': 'Procesando...',
        'search': 'Buscar: ',
        'zeroRecords': 'No se encontraron plantas',
        'paginate': {
          'first': 'Primero',
          'last': 'Último',
          'next': 'Próximo',
          'previous': 'Anterior'
        },
        'aria': {
          'sortAscending': ': activar ordenamiento de columnas ascendentemente',
          'sortDescending': ': activar ordenamiento de columnas descendentemente'
        }
      }
    };
  }

  getPlantaById(id) {
    this.plantaService.getPlantaById(id).subscribe(res => {
      this.planta = res;
    });
    console.log(this.planta);
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
    Swal.fire({
      title: '¿Está seguro de borrar la planta con ID "' + id + '" ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.plantaService.removePlanta(id).subscribe(res => {
          this.refresh();
          this.toaster.error('Planta borrada');
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
          this.refresh();
          this.toaster.success('Planta creada');
        }
      });
    } else {
      //console.log("n", this.planta);
      this.plantaService.updatePlanta(this.planta).subscribe(res => {
        if (res != null) {
          this.closebutton.nativeElement.click();
          this.refresh();
          this.toaster.success('Planta modificada');
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
