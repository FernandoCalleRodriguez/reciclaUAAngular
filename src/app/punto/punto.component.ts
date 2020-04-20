import { Estancia } from './../shared/models/Estancia';
import { Usuario } from './../shared/models/usuario';
import { LoginComponent } from './../login/login.component';
import Swal from 'sweetalert2';
import { Punto } from '../shared/models/Punto';
import { PuntoService } from '../shared/services/punto.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EstanciaService } from '../shared/services/estancia.service';
@Component({
    selector: 'app-punto',
    templateUrl: './punto.component.html',
    styleUrls: ['./punto.component.css']
})
export class PuntoComponent implements OnInit {

    dtOptions: DataTables.Settings = {};

    estancia: Estancia[];

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
    constructor(private puntoService: PuntoService, private estanciaService: EstanciaService, private toaster: ToastrService) { }
    isEdit = false;
    ngOnInit(): void {
        this.puntoService.getPunto().subscribe(res => {
            this.puntos = res;
            //console.log(this.puntos);
        });

        this.punto = new Punto();
        this.estanciaService.getEstancia().subscribe(res => this.estancia = res)

        this.dtOptions = {
            "language": {
                "decimal": "",
                "emptyTable": "No hay puntos disponibles en la tabla",
                "info": "Mostrando _START_ hasta _END_ de _TOTAL_ puntos en total",
                "infoEmpty": "Mostrando 0 hasta 0 de 0 puntos",
                "infoFiltered": "(filtrado de _MAX_ puntos en total)",
                "infoPostFix": "",
                "thousands": ",",
                "lengthMenu": "Mostar _MENU_ puntos por página",
                "loadingRecords": "Cargando...",
                "processing": "Procesando...",
                "search": "Buscar: ",
                "zeroRecords": "No se encontraron puntos",
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
            title: '¿Está seguro de borrar el punto con ID "' + id + '" ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.value) {
                this.puntoService.removePunto(id).subscribe(res => {
                    this.toaster.error("Punto borrado");
                    this.refresh();
                });
            }
        });
    }
    submit(form: NgForm) {
        if (!this.isEdit) {
            //this.punto.Id = form.value.Id;
            this.punto.Latitud = form.value.Latitud;
            this.punto.Longitud = form.value.Longitud;
            this.punto.Estancia_oid = form.value.Estancia;

            this.puntoService.setPunto(this.punto).subscribe(res => {
                if (res != null) {
                    this.closebutton.nativeElement.click();
                    this.refresh();
                    this.toaster.success("Punto creado");
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