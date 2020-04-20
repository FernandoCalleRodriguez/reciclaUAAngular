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

    dtOptions: DataTables.Settings = {};

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

        this.dtOptions = {
            "language": {
                "decimal": "",
                "emptyTable": "No hay edificios disponibles en la tabla",
                "info": "Mostrando _START_ hasta _END_ de _TOTAL_ edificios en total",
                "infoEmpty": "Mostrando 0 hasta 0 de 0 edificios",
                "infoFiltered": "(filtrado de _MAX_ edificios en total)",
                "infoPostFix": "",
                "thousands": ",",
                "lengthMenu": "Mostar _MENU_ edificios por página",
                "loadingRecords": "Cargando...",
                "processing": "Procesando...",
                "search": "Buscar: ",
                "zeroRecords": "No se encontraron edificios",
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
            title: '¿Está seguro de borrar el edificio con ID "' + id + '" ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: 'No'
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

            this.edificio.Id = parseInt(form.value.Id);
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