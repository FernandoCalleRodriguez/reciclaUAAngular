import Swal from 'sweetalert2';
import { Edificio } from '../shared/models/Edificio';
import { EdificioService } from '../shared/services/edificio.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-edificio',
    templateUrl: './edificio.component.html',
    styleUrls: ['./edificio.component.css']
})
export class EdificioComponent implements OnInit {
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
    constructor(private edificioService: EdificioService, private toaster: ToastrService) { }
    isEdit = false;
    ngOnInit(): void {
        this.edificioService.getEdificio().subscribe(res => {
            this.edificios = res;
            console.log(this.edificios);
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
    add() {
        this.isEdit = false;
        this.edificio = new Edificio();
    }
    delete(id) {
        Swal.fire({
            title: '¿Estas seguro de borrar este edificio?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar!'
        }).then((result) => {
            if (result.value) {
                this.edificioService.removeEdificio(id).subscribe(res => {
                    this.toaster.error("Edificio borrado");
                    this.refresh();
                });
            }
        });
    }
    submit(form: NgForm) {
        if (!this.isEdit) {
            this.edificio.Id = form.value.Id;
            this.edificio.Nombre = form.value.Nombre;
            this.edificioService.setEdificio(this.edificio).subscribe(res => {
                if (res != null) {
                    this.closebutton.nativeElement.click();
                    this.refresh();
                    this.toaster.success("Edificio creado");
                }
            });
        }
        else {
            console.log("n", this.edificio);
            this.edificioService.updateEdificio(this.edificio).subscribe(res => {
                if (res != null) {
                    this.closebutton.nativeElement.click();
                    this.refresh();
                    this.toaster.info("Edificio modificado");
                }
            });
        }
    }
    refresh() {
        this.edificioService.getEdificio().subscribe(res => this.edificios = res);
    }
}
