import { Material } from './../shared/models/Material';
import { NivelService } from './../shared/services/nivel.service';
import { MaterialService } from './../shared/services/materiel.service';
import { Estado } from '../shared/models/Estado';
import { map } from 'rxjs/operators';
import { Item } from '../shared/models/Item';
import { ItemService } from '../shared/services/item.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Nivel } from '../shared/models/Nivel';
import { stringify } from 'querystring';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  estados = [{
    id: 1, value: "verificado"
  },
  {
    id: 2, value: "enProceso"
  },
  {
    id: 3, value: "descartado"
  }];
  items: Item[];
  item: Item;
  nivels: Nivel[];
  materials: Material[];
  imageToDisplay = null;
  @ViewChild('closebutton') closebutton;
  @ViewChild('showModel') showModel;

  constructor(private itemService: ItemService, private materialService: MaterialService, private nivelService: NivelService, private toaster: ToastrService) { }
  isEdit = false;
  selectedImage: File = null;
  dtOptions: DataTables.Settings = {};

  ngOnInit(): void {
    this.itemService.getItems().subscribe(res => {
      this.items = res;

    })

    this.nivelService.getNivel().subscribe(res => {
      this.nivels = res;

    })
    this.materialService.getMaterial().subscribe(res => {
      this.materials = res;
    })
    this.dtOptions = {
      "language": {
        "lengthMenu": "Mostrar _MENU_ records per page",
        "zeroRecords": "No hay datos",
        "info": "Mostrar  _PAGE_ pagina de _PAGES_ paginas",
        "infoEmpty": "No hay datos",
        "infoFiltered": "",
        "search": "buscar"
      }
    }
    this.item = new Item();
  }
  getItemById(id) {
    this.itemService.getById(id).subscribe(res => {
      this.item = res
      this.item.Material_oid = res.MaterialItem.Id
    });
    console.log("item2", this.item)
    this.showModel.nativeElement.click();
    this.isEdit = true;

  }
  add() {
    this.isEdit = false;
    this.item = new Item();
  }
  delete(id) {
    Swal.fire({
      title: 'Estas Seguro de borrar este item?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.itemService.removeItem(id).subscribe(res => {
          this.toaster.error("item borrado")
          this.refresh();
        });
      }
    })
  }
  submit(form: NgForm) {
    if (!this.isEdit) {
      this.item.Nombre = form.value.Nombre;
      this.item.Descripcion = form.value.Descripcion;
      if (this.selectedImage != null) {
        this.item.Imagen = this.selectedImage.name;
      }
      else {
        this.item.Imagen = ""
      }
      this.item.EsValido = parseInt(form.value.EsValido);

      this.item.Usuario_oid = parseInt(localStorage.getItem("ID_USER"));
      this.item.Material_oid = parseInt(form.value.Material);
      this.item.Niveles_oid = parseInt(form.value.Nivel);


      this.itemService.setItem(this.item).subscribe(res => {
        if (res != null) {
          if (this.selectedImage != null) {
            this.uploadImage(res.Id)
          }
          this.closebutton.nativeElement.click();
          this.refresh();
          this.toaster.success("item creado")
        }
      });
    }
    else {
      console.log("n", this.item)
      this.itemService.updateItem(this.item).subscribe(res => {
        if (res != null) {
          this.closebutton.nativeElement.click();
          this.refresh();
          this.toaster.info("item modificado");
        }
      });
    }
  }
  refresh() {
    this.itemService.getItems().subscribe(res => this.items = res)
  }
  showImage(event) {
    this.selectedImage = <File>event.target.files[0];
  }
  uploadImage(id) {
    const fd = new FormData();
    fd.append('img', this.selectedImage, this.selectedImage.name);
    this.itemService.uploadImage(fd, id).subscribe(res => {
      console.log(res)
    })
  }
  getEstado(id) {
    switch (id) {
      case 1:
        return "Verificado"
        break;
      case 2:
        return "En proceso"
        break;

      case 3:
        return "Descartado"
        break;

    }
  }

  getImage(imageName) {
    this.itemService.GetImage(imageName).subscribe(res => {
      this.imageToDisplay = "data:image/bmp;base64," + res
    });
  }
}
