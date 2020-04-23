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
  public dtTrigger: Subject<any> = new Subject();
  isEdit = false;

  constructor(private estanciaService: EstanciaService,
    private plantaService: PlantaService, private edificioService: EdificioService,
    private toaster: ToastrService) {
  }

  ngOnInit(): void {
    this.estanciaService.getEstancia().subscribe(res => {
      this.estancias = res;
      this.dtTrigger.next();

      //console.log(this.estancias);
    }, error => {
      this.estancias = null;
      this.dtTrigger.next();
    });
    this.estancia = new Estancia();
    this.edificioService.getEdificio().subscribe(res => this.edificio = res);
    this.plantaService.getPlanta().subscribe(res => this.planta = res);

    this.dtOptions = {
      'language': {
        'decimal': '',
        'emptyTable': 'No hay estancias disponibles en la tabla',
        'info': 'Mostrando _START_ hasta _END_ de _TOTAL_ estancias en total',
        'infoEmpty': 'Mostrando 0 hasta 0 de 0 estancias',
        'infoFiltered': '(filtrado de _MAX_ estancias en total)',
        'infoPostFix': '',
        'thousands': ',',
        'lengthMenu': 'Mostar _MENU_ estancias por página',
        'loadingRecords': 'Cargando...',
        'processing': 'Procesando...',
        'search': 'Buscar: ',
        'zeroRecords': 'No se encontraron estancias',
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

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getEstanciaById(id) {
    this.estanciaService.getEstanciaById(id).subscribe(res => {
      this.estancia = res;
    });
    console.log(this.estancia);
    this.showModel.nativeElement.click();
    this.isEdit = true;
  }

  add(form) {
    form.reset();
    this.isEdit = false;
    this.estancia = new Estancia();
  }

  delete(id) {
    Swal.fire({
      title: '¿Está seguro de borrar la estancia con ID "' + id + '" ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.estanciaService.removeEstancia(id).subscribe(res => {
          this.toaster.error('Estancia borrada');
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
          this.toaster.success('Estancia creada');
        }
      });
    } else {
      //console.log("n", this.estancia);
      this.estanciaService.updateEstancia(this.estancia).subscribe(res => {
        if (res != null) {
          this.closebutton.nativeElement.click();
          this.refresh();
          this.toaster.success('Estancia modificada');
        }
      });
    }
    form.reset();
  }

  refresh() {
    this.estanciaService.getEstancia().subscribe(res => {
      this.estancias = res;
      this.dtTrigger.next();
    });
  }
}
