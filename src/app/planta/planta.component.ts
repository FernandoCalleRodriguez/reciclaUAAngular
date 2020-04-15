import Swal from 'sweetalert2';
import { Planta } from '../shared/models/Planta';
import { PlantaService } from '../shared/services/planta.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-planta',
  templateUrl: './planta.component.html',
  styleUrls: ['./planta.component.css']
})
export class PlantaComponent implements OnInit {
  plantas: Planta[];
  planta: Planta;
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
  constructor(private plantaService: PlantaService, private toaster: ToastrService) { }
  isEdit = false;
  ngOnInit(): void {
    this.plantaService.getPlanta().subscribe(res => {
      this.plantas = res;
      console.log(this.plantas);
    });
    this.planta = new Planta();
  }
  getPlantaById(id) {
    this.plantaService.getPlantaById(id).subscribe(res => {
      this.planta = res;
    });
    console.log(this.planta);
    this.showModel.nativeElement.click();
    this.isEdit = true;
  }
  add() {
    this.isEdit = false;
    this.planta = new Planta();
  }
  delete(id) {
    Swal.fire({
      title: 'Estas Seguro de borrar esta planta?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.plantaService.removePlanta(id).subscribe(res => {
          this.toaster.error("planta borrada");
          this.refresh();
        });
      }
    });
  }
  submit(form: NgForm) {
    if (!this.isEdit) {
      this.planta.IdPlanta = form.value.IdPlanta;
      this.planta.NumeroPlanta = form.value.NumeroPlanta;
      this.plantaService.setPlanta(this.planta).subscribe(res => {
        if (res != null) {
          this.closebutton.nativeElement.click();
          this.refresh();
          this.toaster.success("planta creada");
        }
      });
    }
    else {
      console.log("n", this.planta);
      this.plantaService.updatePlanta(this.planta).subscribe(res => {
        if (res != null) {
          this.closebutton.nativeElement.click();
          this.refresh();
          this.toaster.info("Planta modificado");
        }
      });
    }
  }
  refresh() {
    this.plantaService.getPlanta().subscribe(res => this.plantas = res);
  }
}
