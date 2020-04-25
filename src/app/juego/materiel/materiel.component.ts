import {DtoptionsService} from './../../shared/services/dtoptions.service';
import {TipoContenedorService} from './../../shared/services/tipo-contenedor.service';
import {Contenedor, TipoContenedor} from './../../shared/models/contenedor';
import {Component, OnInit, ViewChild} from '@angular/core';
import {Material} from '../../shared/models/material';
import {ToastrService} from 'ngx-toastr';
import {MaterialService} from '../../shared/services/materiel.service';
import Swal from 'sweetalert2';
import {NgForm} from '@angular/forms';
import {Subject} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';
import {Router} from '@angular/router';
import {ValidacionService} from '../../shared/services/validacion.service';
import {AutenticacionService} from 'src/app/shared/services/autenticacion.service';
import {Usuario} from 'src/app/shared/models/usuario';
import {UsuarioService} from 'src/app/shared/services/usuario.service';

@Component({
  selector: 'app-materiel',
  templateUrl: './materiel.component.html',
  styleUrls: ['./materiel.component.css']
})
export class MaterielComponent implements OnInit {

  materiales: Material[];
  contenedores: TipoContenedor[];
  material: Material;
  @ViewChild('closebutton') closebutton;
  @ViewChild('showModel') showModel;

  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  user: Usuario = new Usuario();

  constructor(private userService: UsuarioService, private authService: AutenticacionService, private dtOptionsService: DtoptionsService, private contenedorService: TipoContenedorService, private router: Router, private materialService: MaterialService, private toaster: ToastrService,
              private validacionService: ValidacionService) {
    this.authService.estaAutenticado();
    this.userService.getLoggedUser().subscribe(res => {
      this.user = res;
    });
  }


  isEdit = false;
  dtOptions: DataTables.Settings = {};

  ngOnInit(): void {
    this.materialService.getMaterial().subscribe(res => {
      this.materiales = res;
      console.log(res);
      this.dtTrigger.next();
    }, error => {
      this.router.navigate(['/']);
    });
    this.contenedores = this.contenedorService.getTipos();
    this.dtOptions = this.dtOptionsService.getDtoptions('ítems');

    this.material = new Material();
  }

  getMaterialById(id) {
    this.materialService.getMaterialById(id).subscribe(res => {
      this.material = res;
    });
    console.log(this.material);
    this.showModel.nativeElement.click();
    this.isEdit = true;

  }

  add(form) {
    form.reset();
    this.isEdit = false;
    this.material = new Material();
  }

  delete(material: Material) {
    Swal.fire(this.dtOptionsService.getSwalWarningOptions('material', material.Id)).then((result) => {
      if (result.value) {
        this.materialService.removeMaterial(material.Id).subscribe(res => {
          const index = this.materiales.indexOf(material);
          if (index > -1) {
            this.materiales.splice(index, 1);
          }
          this.toaster.error('material borrado');
          this.refresh();
        }, err => {
          this.toaster.error('Error dell servidor');
        });
      }
    });
  }

  submit(form: NgForm) {
    if (!this.isEdit) {
      this.material.Nombre = form.value.Nombre;
      this.material.Contenedor = form.value.Contenedor;
      this.material.Usuario_oid = this.user.Id;
      if (!this.materiales) {
        this.materiales = [];
      }
      this.materialService.setMaterial(this.material).subscribe(res => {
        if (res != null) {
          this.materiales.push(this.material);
          this.closebutton.nativeElement.click();
          this.refresh();
          this.toaster.success('material creado');
        }
      }, err => {
        this.toaster.error('Error dell servidor');
      });
    } else {
      console.log('n', this.material);
      this.materialService.updateMaterial(this.material).subscribe(res => {
        if (res != null) {
          this.closebutton.nativeElement.click();
          this.refresh();
          this.toaster.info('material modificado');
        }
      }, err => {
        this.toaster.error('Error dell servidor');
      });
    }
    form.reset();
  }

  refresh() {
    this.materialService.getMaterial().subscribe(res => this.materiales = res);
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();

      this.dtTrigger.next();
    });
  }

  getEstado(id) {
    return this.validacionService.getEstadoById(id)?.Estado;
  }

  getTipoContenedor(id) {
    return this.contenedorService.getTipoById(id);
  }
}




