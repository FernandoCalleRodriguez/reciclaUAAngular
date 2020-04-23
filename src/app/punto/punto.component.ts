import { AutenticacionService } from './../shared/services/autenticacion.service';
import { Estancia } from '../shared/models/estancia';
import { Usuario } from '../shared/models/usuario';
import { LoginComponent } from './../login/login.component';
import Swal from 'sweetalert2';
import { Punto } from '../shared/models/punto';
import { PuntoService } from '../shared/services/punto.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EstanciaService } from '../shared/services/estancia.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { ActivatedRoute, Router } from '@angular/router';

import { UsuarioService } from '../shared/services/usuario.service';

@Component({
    selector: 'app-punto',
    templateUrl: './punto.component.html',
    styleUrls: ['./punto.component.css']
})
export class PuntoComponent implements OnInit, OnDestroy {

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
    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;

    public dtTrigger: Subject<any> = new Subject();
    public user: Usuario = new Usuario();

    constructor(private puntoService: PuntoService, private estanciaService: EstanciaService,
        private autenticacionService: AutenticacionService, protected usuarioService: UsuarioService,
        private toaster: ToastrService) {

        autenticacionService.estaAutenticado();
        this.usuarioService.getLoggedUser().subscribe(u => {
            this.user = u;
        });
    }
    isEdit = false;
    ngOnInit(): void {

        this.puntoService.getPunto().subscribe(res => {
            this.puntos = res;
            this.dtTrigger.next();
        });

        this.punto = new Punto();
        this.estanciaService.getEstancia().subscribe(res => {
            this.estancia = res;
            this.dtTrigger.next();
        });

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
    add(form) {
        form.reset();
        this.isEdit = false;
        this.punto = new Punto();
    }
    ngOnDestroy(): void {
        this.dtTrigger.unsubscribe();
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
                    this.toaster.error('Punto borrado');
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
            //console.log(this.user.Id);
            this.punto.Usuario_oid = this.user.Id;
            this.punto.Estancia_oid = form.value.Estancia;

            this.puntoService.setPunto(this.punto).subscribe(res => {
                if (res != null) {
                    this.closebutton.nativeElement.click();
                    this.refresh();
                    this.toaster.success('Punto creado');
                }
            });
        }
        else {
            //console.log("n", this.punto);
            this.puntoService.updatePunto(this.punto).subscribe(res => {
                if (res != null) {
                    this.closebutton.nativeElement.click();
                    this.refresh();
                    this.toaster.success('Punto modificado');
                }
            });
        }
        form.reset();
    }


    refresh() {
        this.puntoService.getPunto().subscribe(res => {
            this.puntos = res;

            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                dtInstance.destroy();
                this.dtTrigger.next();
            });
        });
    }

}
