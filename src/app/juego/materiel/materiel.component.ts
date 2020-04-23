import { TipoContenedorService } from './../../shared/services/tipo-contenedor.service';
import { Contenedor, TipoContenedor } from './../../shared/models/contenedor';
 import { Component, OnInit, ViewChild } from '@angular/core';
import { Material } from '../../shared/models/material';
import { ToastrService } from 'ngx-toastr';
import { MaterialService } from '../../shared/services/materiel.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { Router } from '@angular/router';
import { ValidacionService } from '../../shared/services/validacion.service';

@Component({
  selector: 'app-materiel',
  templateUrl: './materiel.component.html',
  styleUrls: ['./materiel.component.css']
})
export class MaterielComponent implements OnInit {

  materiales: Material[];
  contenedores: TipoContenedor[];
  material: Material;
  @ViewChild('closebutton') closebutton;
  @ViewChild('showModel') showModel;

  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  constructor(private contenedorService: TipoContenedorService, private router: Router, private materialService: MaterialService, private toaster: ToastrService,
    private validacionService: ValidacionService) {
  }

  isEdit = false;
  dtOptions: DataTables.Settings = {};

  ngOnInit(): void {
    this.materialService.getMaterial().subscribe(res => {
      this.materiales = res;
      console.log(res)
      this.dtTrigger.next();
    }, error => {
      this.router.navigate(['/']);
    });
    this.contenedores=this.contenedorService.getTipos();
    this.dtOptions = {
      'language': {
        'decimal': '',
        'emptyTable': 'No hay material disponibles en la tabla',
        'info': 'Mostrando _START_ hasta _END_ de _TOTAL_ materiales en total',
        'infoEmpty': 'Mostrando 0 hasta 0 de 0 materiales',
        'infoFiltered': '(filtrado de _MAX_ materiales en total)',
        'infoPostFix': '',
        'thousands': ',',
        'lengthMenu': 'Mostar _MENU_ materiales por página',
        'loadingRecords': 'Cargando...',
        'processing': 'Procesando...',
        'search': 'Buscar: ',
        'zeroRecords': 'No se encontraron materiales',
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
    this.material = new Material();
  }

  getMaterialById(id) {
    this.materialService.getMaterialById(id).subscribe(res => {
      this.material = res;
    });
    console.log(this.material);
    this.showModel.nativeElement.click();
    this.isEdit = true;

  }

  add(form) {
    form.reset();
    this.isEdit = false;
    this.material = new Material();
  }

  delete(material: Material) {
    Swal.fire({
      title: '¿Estás seguro de que deseas borrar el material ' + material.Id + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.materialService.removeMaterial(material.Id).subscribe(res => {
          const index = this.materiales.indexOf(material);
          if (index > -1) {
            this.materiales.splice(index, 1);
          }
          this.toaster.error('material borrado');
          this.refresh();
        }, err => {
          this.toaster.error("Error dell servidor")
        });
      }
    });
  }

  submit(form: NgForm) {
    if (!this.isEdit) {
      this.material.Nombre = form.value.Nombre;
      this.material.Contenedor = form.value.Contenedor;
      this.material.Usuario_oid = parseInt(localStorage.getItem('ID_USER'));
      if (!this.materiales) {
        this.materiales = [];
      }
      this.materiales.push(this.material);

      this.materialService.setMaterial(this.material).subscribe(res => {
        if (res != null) {
          this.closebutton.nativeElement.click();
          this.refresh();
          this.toaster.success('material creado');
        }
      }, err => {
        this.toaster.error("Error dell servidor")
      });
    } else {
      console.log('n', this.material);
      this.materialService.updateMaterial(this.material).subscribe(res => {
        if (res != null) {
          this.closebutton.nativeElement.click();
          this.refresh();
          this.toaster.info('material modificado');
        }
      }, err => {
        this.toaster.error("Error dell servidor")
      });
    }
    form.reset();
  }

  refresh() {
    this.materialService.getMaterial().subscribe(res => this.materiales = res);
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();

      this.dtTrigger.next();
    });
  }

  getEstado(id) {
    return this.validacionService.getEstadoById(id)?.Estado;
  }
  getTipoContenedor(id){
    return this.contenedorService.getTipoById(id);
  }
}




