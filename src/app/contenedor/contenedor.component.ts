import { AutenticacionService } from './../shared/services/autenticacion.service';
import Swal from 'sweetalert2';
import { Contenedor } from '../shared/models/contenedor';
import { ContenedorService } from '../shared/services/contenedor.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Punto } from '../shared/models/punto';
import { PuntoService } from '../shared/services/punto.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-contenedor',
  templateUrl: './contenedor.component.html',
  styleUrls: ['./contenedor.component.css']
})
export class ContenedorComponent implements OnInit, OnDestroy {

  contenedores: Contenedor[];
  contenedor: Contenedor;

  punto: Punto[];

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

  constructor(private contenedorService: ContenedorService, private puntoService: PuntoService,
    private autenticacionService: AutenticacionService, private toaster: ToastrService) {

    autenticacionService.estaAutenticado();
  }

  ngOnInit(): void {
    this.contenedorService.getContenedor().subscribe(res => {
      this.contenedores = res;
      this.dtTrigger.next();
      //console.log(this.contenedores);
    });
    this.contenedor = new Contenedor();
    this.puntoService.getPunto().subscribe(res => this.punto = res)

    this.dtOptions = {
      "language": {
        "decimal": "",
        "emptyTable": "No hay contenedores disponibles en la tabla",
        "info": "Mostrando _START_ hasta _END_ de _TOTAL_ contenedores en total",
        "infoEmpty": "Mostrando 0 hasta 0 de 0 contenedores",
        "infoFiltered": "(filtrado de _MAX_ contenedores en total)",
        "infoPostFix": "",
        "thousands": ",",
        "lengthMenu": "Mostar _MENU_ contenedores por página",
        "loadingRecords": "Cargando...",
        "processing": "Procesando...",
        "search": "Buscar: ",
        "zeroRecords": "No se encontraron contenedores",
        "paginate": {
          "first": "Primero",
          "last": "Último",
          "next": "Próximo",
          "previous": "Anterior"
        },
        "aria": {
          "sortAscending": ": activar ordenamiento de columnas ascendentemente",
          "sortDescending": ": activar ordenamiento de columnas descendentemente"
        }
      }
    }
  }
  getContenedorById(id) {
    this.contenedorService.getContenedorById(id).subscribe(res => {
      this.contenedor = res;
    });
    //console.log(this.contenedor);
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
    Swal.fire({
      title: '¿Está seguro de borrar el contenedor con ID "' + id + '" ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.contenedorService.removeContenedor(id).subscribe(res => {
          this.refresh();
          this.toaster.error("Contenedor borrado");
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
          this.refresh();
          this.toaster.success("Contenedor creado");
        }
      });
    }
    else {
      //console.log("n", this.contenedor);
      this.contenedorService.updateContenedor(this.contenedor).subscribe(res => {
        if (res != null) {
          this.closebutton.nativeElement.click();
          this.refresh();
          this.toaster.success("Contenedor modificado");
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

}
