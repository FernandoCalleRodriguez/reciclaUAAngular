import { Material } from '../../shared/models/material';
import { NivelService } from '../../shared/services/nivel.service';
import { MaterialService } from '../../shared/services/materiel.service';
import { Estado } from '../../shared/models/estado';
import { map } from 'rxjs/operators';
import { Item } from '../../shared/models/item';
import { ItemService } from '../../shared/services/item.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Nivel } from '../../shared/models/nivel';
import { stringify } from 'querystring';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { ValidacionService } from '../../shared/services/validacion.service';
import { DtoptionsService } from 'src/app/shared/services/dtoptions.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  items: Item[];
  item: Item;
  nivels: Nivel[];
  materials: Material[];
  imageToDisplay = null;
  @ViewChild('closebutton') closebutton;
  @ViewChild('showModel') showModel;
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  constructor(private dtOptionsService:DtoptionsService,private router: Router, private route: ActivatedRoute, private itemService: ItemService, private materialService: MaterialService,
    private nivelService: NivelService, private toaster: ToastrService, private validacionService: ValidacionService) {
  }

  isEdit = false;
  selectedImage: File = null;
  itemNivel: { item: Item, nivel: Nivel }[] = [];

  dtOptions: DataTables.Settings = {};
  ngOnInit(): void {
    var nivelId = this.route.snapshot.queryParamMap.get('Niveles_oid');
    if (nivelId != null) {
      this.itemService.BuscarItemsPorNivel(nivelId).subscribe(res => {
        this.items = res;
        this.dtTrigger.next();
      }, err => {
        this.toaster.error("Error dell servidor")
      });
    } else {
      this.itemService.getItems().subscribe(res => {
        this.items = res;
        this.dtTrigger.next();
      }, error => {
        this.router.navigate(['/']);
      });
    }

    this.nivelService.getNivel().subscribe(res => {
      this.nivels = res;
    });
    this.materialService.getMaterial().subscribe(res => {
      this.materials = res;
    });
    this.dtOptions= this.dtOptionsService.getDtoptions("item");
    this.item = new Item();
    this.itemNivel = this.nivelService.load();
  }

  getItemById(id) {
    this.itemService.getById(id).subscribe(res => {
      this.item = res;
      this.item.Material_oid = res.MaterialItem.Id;
    });
    this.showModel.nativeElement.click();
    this.isEdit = true;

  }

  add(form) {
    form.reset();
    this.isEdit = false;
    this.item = new Item();
  }

  delete(item: Item) {
    var tempItem: Item;
    Swal.fire(this.dtOptionsService.getSwalWarningOptions("item",item.Id)).then((result) => {
      if (result.value) {
        this.itemService.removeItem(item.Id).subscribe(res => {
          const index = this.items.indexOf(item);
          if (index > -1) {
            this.items.splice(index, 1);
          }
          this.toaster.error('item borrado');
          this.itemService.RemoveImage(item.Id, item.Imagen).subscribe(res => console.log(res));
          this.refresh();
        }, err => {
          this.toaster.error("Error dell servidor")
        });
      }
    });
  }

  submit(form: NgForm) {
    if (!this.isEdit) {

      this.item.Nombre = form.value.Nombre;
      this.item.Descripcion = form.value.Descripcion;
      if (this.selectedImage != null) {
        this.item.Imagen = this.selectedImage.name;
      } else {
        this.item.Imagen = '';
      }

      this.item.Usuario_oid = parseInt(localStorage.getItem('ID_USER'));
      this.item.Material_oid = parseInt(form.value.Material);

      if (!this.items) {
        this.items = [];
      }
 

      this.itemService.setItem(this.item).subscribe(res => {
        if (res != null) {
          if (this.selectedImage != null) {
            this.items.push(this.item);
            this.uploadImage(res.Id);
          }
          this.closebutton.nativeElement.click();
          this.refresh();
          this.toaster.success('item creado');
        }
      }, err => {
        this.toaster.error("Error dell servidor")
      });
    } else {
      if (this.selectedImage != null) {
        this.item.Imagen = this.selectedImage.name;
      }
      this.itemService.updateItem(this.item).subscribe(res => {
        if (res != null) {
          if (this.selectedImage != null) {
            this.uploadImage(res.Id);
          }
          this.closebutton.nativeElement.click();
          this.refresh();
          this.toaster.info('item modificado');
        }
      }, err => {
        this.toaster.error("Error dell servidor")
      });


    }
    form.reset();
  }

  refresh() {
    this.itemService.getItems().subscribe(res => this.items = res);
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();

      this.dtTrigger.next();
    });
  }

  showImage(event) {
    this.selectedImage = <File>event.target.files[0];
  }

  uploadImage(id) {
    const fd = new FormData();
    fd.append('img', this.selectedImage, this.selectedImage.name);
    this.itemService.uploadImage(fd, id).subscribe(res => {
      this.refresh();
    });
  }

  getEstado(id) {
    if (id != null) return this.validacionService.getEstadoById(id)?.Estado;
  }

  getImage(id, imageName) {
    this.itemService.GetImage(id, imageName).subscribe(res => {
      if (res == null)
        this.imageToDisplay = null;
      else
        this.imageToDisplay = 'data:image/bmp;base64,' + res;
    });
  }

  getItemNivel(id) {
    return this.itemNivel.find(o => o.item.Id == id)?.nivel?.Numero;
    // return this.nivelService.getNivelByItem(id)?.Numero;
  }
}
