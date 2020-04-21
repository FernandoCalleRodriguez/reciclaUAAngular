import {Material} from '../../shared/models/material';
import {NivelService} from '../../shared/services/nivel.service';
import {MaterialService} from '../../shared/services/materiel.service';
import {Estado} from '../../shared/models/estado';
import {map} from 'rxjs/operators';
import {Item} from '../../shared/models/item';
import {ItemService} from '../../shared/services/item.service';
import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import Swal from 'sweetalert2';
import {Nivel} from '../../shared/models/nivel';
import {stringify} from 'querystring';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';
import {ValidacionService} from '../../shared/services/validacion.service';

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

  constructor(private router: Router, private route: ActivatedRoute, private itemService: ItemService, private materialService: MaterialService,
              private nivelService: NivelService, private toaster: ToastrService, private validacionService: ValidacionService) {
  }

  isEdit = false;
  selectedImage: File = null;
  dtOptions: DataTables.Settings = {};

  ngOnInit(): void {
    var nivelId = this.route.snapshot.queryParamMap.get('Niveles_oid');
    if (nivelId != null) {
      this.itemService.BuscarItemsPorNivel(nivelId).subscribe(res => {
        this.items = res;
        this.dtTrigger.next();
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
    this.dtOptions = {
      'language': {
        'decimal': '',
        'emptyTable': 'No hay item disponibles en la tabla',
        'info': 'Mostrando _START_ hasta _END_ de _TOTAL_ items en total',
        'infoEmpty': 'Mostrando 0 hasta 0 de 0 niveles',
        'infoFiltered': '(filtrado de _MAX_ items en total)',
        'infoPostFix': '',
        'thousands': ',',
        'lengthMenu': 'Mostar _MENU_ items por página',
        'loadingRecords': 'Cargando...',
        'processing': 'Procesando...',
        'search': 'Buscar: ',
        'zeroRecords': 'No se encontraron items',
        'paginate': {
          'first': 'Primero',
          'last': 'Último',
          'next': 'Próximo',
          'previous': 'Anterior'
        },
        'aria': {
          'sortAscending': ': activar ordenamiento de columnas ascendentemente',
          'sortDescending': ': activar ordenamiento de columnas descendentemente'
        }
      }
    };
    this.item = new Item();
  }

  getItemById(id) {
    this.itemService.getById(id).subscribe(res => {
      this.item = res;
      this.item.Material_oid = res.MaterialItem.Id;
    });
    this.showModel.nativeElement.click();
    this.isEdit = true;

  }

  add() {
    this.isEdit = false;
    this.item = new Item();
  }

  delete(item: Item) {
    var tempItem: Item;
    Swal.fire({
      title: '¿Estás seguro de que deseas borrar el item ' + item.Id + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.itemService.removeItem(item.Id).subscribe(res => {
          const index = this.items.indexOf(item);
          if (index > -1) {
            this.items.splice(index, 1);
          }
          this.toaster.error('item borrado');
          this.itemService.RemoveImage(item.Id, item.Imagen).subscribe(res => console.log(res));
          this.refresh();
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
      this.items.push(this.item);

      this.itemService.setItem(this.item).subscribe(res => {
        if (res != null) {
          if (this.selectedImage != null) {
            this.uploadImage(res.Id);
          }
          this.closebutton.nativeElement.click();
          this.refresh();
          this.toaster.success('item creado');
        }
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
    this.selectedImage = <File> event.target.files[0];
  }

  uploadImage(id) {
    const fd = new FormData();
    fd.append('img', this.selectedImage, this.selectedImage.name);
    this.itemService.uploadImage(fd, id).subscribe(res => {
      this.refresh();
    });
  }

  getEstado(id) {
    return this.validacionService.getEstadoById(id).Estado;
  }

  getImage(id, imageName) {
    this.itemService.GetImage(id, imageName).subscribe(res => {
      this.imageToDisplay = 'data:image/bmp;base64,' + res;
    });
  }

  getItemNivel(id) {
    console.log(id);
    return id;
  }
}
