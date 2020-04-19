import { Component, OnInit, ViewChild } from '@angular/core';
import { Material } from '../shared/models/Material';
import { ToastrService } from 'ngx-toastr';
import { MaterialService } from '../shared/services/materiel.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-materiel',
  templateUrl: './materiel.component.html',
  styleUrls: ['./materiel.component.css']
})
export class MaterielComponent implements OnInit {

  materiales: Material[];
  material: Material;
  @ViewChild('closebutton') closebutton;
  @ViewChild('showModel') showModel;
  estados = [{
    id: 1, value: "verificado"
  },
  {
    id: 2, value: "enProceso"
  },
  {
    id: 3, value: "descartado"
  }];
  constructor(private materialService: MaterialService, private toaster: ToastrService) { }
  isEdit = false;
  dtOptions: DataTables.Settings = {};

  ngOnInit(): void {
    this.materialService.getMaterial().subscribe(res => {
      this.materiales = res;

    })
    this.dtOptions = {
      "language": {
        "lengthMenu": "Mostrar _MENU_ records per page",
        "zeroRecords": "No hay datos",
        "info": "Mostrar  _PAGE_ pagina de _PAGES_ paginas",
        "infoEmpty": "No hay datos",
        "infoFiltered": "",
        "search": "buscar",
        paginate: {
          previous: "Previoso",
          first: "Primero",
          last: "Ultimo",
          next: "Siguiente"
        }
      }
    }
    this.material = new Material();
  }
  getMaterialById(id) {
    this.materialService.getMaterialById(id).subscribe(res => {
      this.material = res
    });
    console.log(this.material)
    this.showModel.nativeElement.click();
    this.isEdit = true;

  }
  add() {
    this.isEdit = false;
    this.material = new Material();
  }
  delete(id) {
    Swal.fire({
      title: 'Estas Seguro de borrar este material?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si!'
    }).then((result) => {
      if (result.value) {
        this.materialService.removeMaterial(id).subscribe(res => {
          this.toaster.error("material borrado")
          this.refresh();
        });
      }
    })
  }
  submit(form: NgForm) {
    if (!this.isEdit) {
      this.material.Nombre = form.value.Nombre;
      this.material.Contenedor = form.value.Contenedor;
      this.material.EsValido = 2;
      this.material.Usuario_oid = parseInt(localStorage.getItem("ID_USER"));

      this.materialService.setMaterial(this.material).subscribe(res => {
        if (res != null) {
          this.closebutton.nativeElement.click();
          this.refresh();
          this.toaster.success("material creado")
        }
      });
    }
    else {
      console.log("n", this.material)
      this.materialService.updateMaterial(this.material).subscribe(res => {
        if (res != null) {
          this.closebutton.nativeElement.click();
          this.refresh();
          this.toaster.info("material modificado");
        }
      });
    }
  }
  refresh() {
    this.materialService.getMaterial().subscribe(res => this.materiales = res)
  }
  getEstado(id) {
    switch (id) {
      case 1:
        return "Verificado"
        break;
      case 2:
        return "En proceso"
        break;

      case 3:
        return "Descartado"
        break;

    }
  }
}




