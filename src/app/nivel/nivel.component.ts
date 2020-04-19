import Swal from 'sweetalert2';
import { Nivel } from '../shared/models/Nivel';
import { NivelService } from '../shared/services/nivel.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-nivel',
  templateUrl: './nivel.component.html',
  styleUrls: ['./nivel.component.css']
})
export class NivelComponent implements OnInit {
  niveles: Nivel[];
  nivel: Nivel;
  @ViewChild('closebutton') closebutton;
  @ViewChild('showModel') showModel;
  constructor(private nivelService: NivelService, private toaster: ToastrService) { }
  isEdit = false;
  modelTitle = "";
  dtOptions: DataTables.Settings = {};

  ngOnInit(): void {
    this.nivelService.getNivel().subscribe(res => {
      this.niveles = res;
      console.log(this.niveles)

    })
    this.nivel = new Nivel();
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
    };

  }
  getNivelById(id) {
    
    this.nivelService.getNivelById(id).subscribe(res => {
      this.nivel = res
    });

    this.showModel.nativeElement.click();
    this.isEdit = true;
    console.log(this.modelTitle)
  }
  add() {

    this.isEdit = false;
    this.nivel = new Nivel();
  }

  delete(id) {
    Swal.fire({
      title: 'Estas Seguro de borrar este nivel?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.value) {
        this.nivelService.removeNivel(id).subscribe(res => {
          this.toaster.error("nivel borrado")
          this.refresh();
        });
      }
    })



  }
  submit(form: NgForm) {
    if (!this.isEdit) {
      this.nivel.Numero = form.value.Numero;
      this.nivel.Puntuacion = form.value.Puntuacion;

      this.nivelService.setNivel(this.nivel).subscribe(res => {
        if (res != null) {
          console.log("add", res)
          this.closebutton.nativeElement.click();
          this.refresh();
          this.toaster.success("nivel creado")
        }
      });
    }
    else {
      console.log("n", this.nivel)
      this.nivelService.updateNivel(this.nivel).subscribe(res => {
        if (res != null) {
          this.closebutton.nativeElement.click();
          this.refresh();
          this.toaster.info("Nivel modificado");
        }
      });
    }
  }
  refresh() {
    this.nivelService.getNivel().subscribe(res => this.niveles = res)
  }
  show(id) {
    console.log(id);
  }

}
