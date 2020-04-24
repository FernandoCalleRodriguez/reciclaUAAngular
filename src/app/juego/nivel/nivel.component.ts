import { DtoptionsService } from './../../shared/services/dtoptions.service';
import { ItemService } from '../../shared/services/item.service';
import Swal from 'sweetalert2';
import { Nivel } from '../../shared/models/nivel';
import { NivelService } from '../../shared/services/nivel.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { Router } from '@angular/router';
import { Item } from '../../shared/models/item';

import { IDropdownSettings } from 'ng-multiselect-dropdown';
 import { AutenticacionService } from 'src/app/shared/services/autenticacion.service';
 

@Component({
  selector: 'app-nivel',
  templateUrl: './nivel.component.html',
  styleUrls: ['./nivel.component.css']
})
export class NivelComponent implements OnInit, OnDestroy {
  niveles: Nivel[];
  nivel: Nivel;
  @ViewChild('closebutton') closebutton;
  @ViewChild('AssignClosebutton') AssignClosebutton;
  @ViewChild('showModel') showModel;

  constructor(private authService:AutenticacionService,private dtOptionsService:DtoptionsService,private itemService: ItemService, private router: Router, private nivelService: NivelService, private toaster: ToastrService) {
  this.authService.estaAutenticado();
  
  }

  isEdit = false;
  modelTitle = '';
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  isAssignar = false;
  items: Item[];
  selectedItems: Item[];
  dropdownSettings: IDropdownSettings = {};

  ngOnInit(): void {
    this.nivelService.getNivel().subscribe(res => {
      this.niveles = res;
      this.dtTrigger.next();
    }, error => {
      this.router.navigate(['/']);
    });
    this.itemService.getItems().subscribe(res => this.items = res);

    this.nivel = new Nivel();
    this.dtOptions = this.dtOptionsService.getDtoptions("nivel");
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'Id',
      textField: 'Nombre',
      selectAllText: 'Elijir todos los items',
      unSelectAllText: 'Quitar todos los items',
      allowSearchFilter: true,
      searchPlaceholderText: 'Buscar'
    };
  }

  getNivelById(id) {

    this.nivelService.getNivelById(id).subscribe(res => {
      this.nivel = res;
    });

    this.showModel.nativeElement.click();
    this.isEdit = true;
    console.log(this.modelTitle);
  }

  add(form) {
    form.reset();
    this.isEdit = false;
    this.nivel = new Nivel();
  }

  delete(nivel: Nivel) {

    Swal.fire(this.dtOptionsService.getSwalWarningOptions("nivel",nivel.Id)).then((result) => {
      if (result.value) {
        this.nivelService.removeNivel(nivel.Id).subscribe(res => {
          const index = this.niveles.indexOf(nivel);
          if (index > -1) {
            this.niveles.splice(index, 1);
          }
          this.toaster.error('Nivel ' + nivel.Id + ' borrado');
          this.refresh();
        }, err => {
          this.toaster.error("Error dell servidor")
        });
      }
    });


  }

  submit(form: NgForm) {
    if (!this.isEdit) {
      if (!this.niveles) {
        this.niveles = [];
      }
      this.nivel.Numero = form.value.Numero;
      this.nivel.Puntuacion = form.value.Puntuacion;
     
      this.nivelService.setNivel(this.nivel).subscribe(res => {
        if (res != null) {
          console.log('add', res);
          this.closebutton.nativeElement.click();
           this.niveles.push(this.nivel);
          this.refresh();
          this.toaster.success('nivel creado');
        }
      }, err => {
        console.log(err)
        this.toaster.error("Error ")
      });
    } else {
      console.log('n', this.nivel);
      this.nivelService.updateNivel(this.nivel).subscribe(res => {
        if (res != null) {
          this.closebutton.nativeElement.click();
          this.refresh();
          this.toaster.info('Nivel modificado');
        }
      }, err => {
        this.toaster.error("Error dell servidor")
      });
    }
    form.reset();
  }

  refresh() {
    this.nivelService.getNivel().subscribe(res => this.niveles = res);
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();

      this.dtTrigger.next();
    });

  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  setAssignedNivel(nivel) {
    this.nivel = nivel;
    this.itemService.BuscarItemsPorNivel(nivel.Id).subscribe(res => this.selectedItems = res);
  }

  assignar(form) {

    this.itemService.BuscarItemsPorNivel(this.nivel.Id).subscribe(res => {
      if (res != null) {
        this.nivelService.desassignarItems(this.nivel.Id, res.map((item: Item) => item.Id)).subscribe(s => {
          this.nivelService.assignItem(this.nivel.Id, this.selectedItems.map((item: Item) => item.Id)).subscribe();

        });
      } else {
        this.nivelService.assignItem(this.nivel.Id, this.selectedItems.map((item: Item) => item.Id)).subscribe();
      }
    });

    console.log('tt', this.selectedItems.map((item: Item) => item.Id));
    this.AssignClosebutton.nativeElement.click();

  }

}
