import Swal from 'sweetalert2';
import { Estancia } from '../shared/models/Estancia';
import { EstanciaService } from '../shared/services/estancia.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-estancia',
  templateUrl: './estancia.component.html',
  styleUrls: ['./estancia.component.css']
})
export class EstanciaComponent implements OnInit {
  estancias: Estancia[];
  estancia: Estancia;
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
  constructor(private estanciaService: EstanciaService, private toaster: ToastrService) { }
  isEdit = false;
  ngOnInit(): void {
    this.estanciaService.getEstancia().subscribe(res => {
      this.estancias = res;
      console.log(this.estancias);
    });
    this.estancia = new Estancia();
  }
  getEstanciaById(id) {
    this.estanciaService.getEstanciaById(id).subscribe(res => {
      this.estancia = res;
    });
    console.log(this.estancia);
    this.showModel.nativeElement.click();
    this.isEdit = true;
  }
  add() {
    this.isEdit = false;
    this.estancia = new Estancia();
  }
  delete(id) {
    Swal.fire({
      title: 'Estas Seguro de borrar este estancia?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.value) {
        this.estanciaService.removeEstancia(id).subscribe(res => {
          this.toaster.error("estancia borrado");
          this.refresh();
        });
      }
    });
  }
  submit(form: NgForm) {
    if (!this.isEdit) {
      this.estancia.Id = form.value.idEstancia;
      this.estancia.Nombre = form.value.Nombre;
      this.estanciaService.setEstancia(this.estancia).subscribe(res => {
        if (res != null) {
          this.closebutton.nativeElement.click();
          this.refresh();
          this.toaster.success("estancia creado");
        }
      });
    }
    else {
      console.log("n", this.estancia);
      this.estanciaService.updateEstancia(this.estancia).subscribe(res => {
        if (res != null) {
          this.closebutton.nativeElement.click();
          this.refresh();
          this.toaster.info("Estancia modificada");
        }
      });
    }
  }
  refresh() {
    this.estanciaService.getEstancia().subscribe(res => this.estancias = res);
  }
}
