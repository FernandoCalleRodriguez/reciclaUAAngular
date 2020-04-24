import { Estado } from './../shared/models/estado';
import { AutenticacionService } from './../shared/services/autenticacion.service';
import { ValidacionService } from './../shared/services/validacion.service';


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
import { DtoptionsService } from '../shared/services/dtoptions.service';

import { UsuarioService } from '../shared/services/usuario.service';

@Component({
    selector: 'app-punto',
    templateUrl: './punto.component.html',
    styleUrls: ['./punto.component.css']
})
export class PuntoComponent implements OnInit, OnDestroy {

    puntos: Punto[];
    punto: Punto;

    estancia: Estancia[];

    public estados: Estado[] = null;

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
    dtTrigger: Subject<any> = new Subject();
    user: Usuario = new Usuario();
    isEdit = false;

    constructor(private puntoService: PuntoService, protected dtoptionsService: DtoptionsService, private estanciaService: EstanciaService,
        public validacionService: ValidacionService, private autenticacionService: AutenticacionService, protected usuarioService: UsuarioService,
        private toaster: ToastrService) {

        this.estados = validacionService.getEstados();

        autenticacionService.estaAutenticado();
        this.usuarioService.getLoggedUser().subscribe(u => {
            this.user = u;
        });
        this.dtOptions = dtoptionsService.getDtoptions('punto');
    }

    ngOnInit(): void {

        this.puntoService.getPunto().subscribe(res => {
            this.puntos = res;
            this.dtTrigger.next();
        });

        this.punto = new Punto();
        this.estanciaService.getEstancia().subscribe(res => this.estancia = res);

    }
    getPuntoById(id) {
        this.puntoService.getPuntoById(id).subscribe(res => {

            this.punto = res;
            this.punto.Estancia_oid = "" + res?.EstanciaPunto.Id;
        });

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
        Swal.fire(this.dtoptionsService.getSwalWarningOptions('el punto', id))
            .then((result) => {
                if (result.value) {
                    this.puntoService.removePunto(id).subscribe(res => {
                        this.toaster.error('Punto ' + id + ' borrado');
                        this.refresh();
                    });
                }
            });
    }

    submit(form: NgForm) {
        if (!this.isEdit) {

            this.punto.Latitud = form.value.Latitud;
            this.punto.Longitud = form.value.Longitud;
            //console.log(this.user.Id);
            this.punto.Usuario_oid = -1;
            this.punto.Estancia_oid = form.value.Estancia;

            this.puntoService.setPunto(this.punto).subscribe(res => {
                if (res != null) {
                    this.closebutton.nativeElement.click();

                    this.toaster.success('Punto ' + res.Id + ' creado');
                    this.refresh();
                }
            });
        }
        else {
            this.puntoService.updatePunto(this.punto).subscribe(res => {
                if (res != null) {
                    this.closebutton.nativeElement.click();

                    this.toaster.success('Punto ' + this.punto.Id + ' modificado');
                    this.refresh();
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
