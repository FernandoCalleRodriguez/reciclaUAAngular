import { LoginComponent } from './../login/login.component';
import Swal from 'sweetalert2';
import { Punto } from '../shared/models/Punto';
import { PuntoService } from '../shared/services/punto.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'app-punto',
    templateUrl: './punto.component.html',
    styleUrls: ['./punto.component.css']
})
export class PuntoComponent implements OnInit {
  puntos: Punto[];
  punto: Punto;
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
    constructor(private puntoService: PuntoService, private toaster: ToastrService) { }
    isEdit = false;
    ngOnInit(): void {
        this.puntoService.getPunto().subscribe(res => {
            this.puntos = res;
            console.log(this.puntos);
        });
        this.punto = new Punto();
    }
    getPuntoById(id) {
        this.puntoService.getPuntoById(id).subscribe(res => {
            this.punto = res;
        });
        console.log(this.punto);
        this.showModel.nativeElement.click();
        this.isEdit = true;
    }
    add() {
        this.isEdit = false;
        this.punto = new Punto();
    }
    delete(id) {
        Swal.fire({
            title: 'Estas Seguro de borrar este punto?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Borrar!'
        }).then((result) => {
            if (result.value) {
                this.puntoService.removePunto(id).subscribe(res => {
                    this.toaster.error("punto borrado");
                    this.refresh();
                });
            }
        });
    }
    submit(form: NgForm) {
        if (!this.isEdit) {
            this.punto.Id = form.value.Id;
            this.punto.Latitud = form.value.Latitud;
            this.punto.Longitud = form.value.Longitud;
                        
            this.puntoService.setPunto(this.punto).subscribe(res => {
                if (res != null) {
                    this.closebutton.nativeElement.click();
                    this.refresh();
                    this.toaster.success("punto creado");
                }
            });
        }
        else {
            console.log("n", this.punto);
            this.puntoService.updatePunto(this.punto).subscribe(res => {
                if (res != null) {
                    this.closebutton.nativeElement.click();
                    this.refresh();
                    this.toaster.info("Punto modificado");
                }
            });
        }
    }
    refresh() {
        this.puntoService.getPunto().subscribe(res => this.puntos = res);
    }
}