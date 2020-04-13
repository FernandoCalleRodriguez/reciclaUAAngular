import {Component, OnInit} from '@angular/core';
import {ValidacionService} from '../../shared/services/validacion.service';
import {Material} from '../../shared/models/material';
import {Punto} from '../../shared/models/punto';
import {Item} from '../../shared/models/item';
import {TipoContenedorService} from '../../shared/services/tipo-contenedor.service';
import {TipoContenedor} from '../../shared/models/contenedor';

@Component({
  selector: 'app-lista-validaciones',
  templateUrl: './lista-validaciones.component.html',
  styleUrls: ['./lista-validaciones.component.css']
})
export class ListaValidacionesComponent implements OnInit {
  public puntos: Punto[] = null;
  public items: Item[] = null;
  public materiales: Material[] = null;

  constructor(protected validacionService: ValidacionService, protected tipoContenedorService: TipoContenedorService) {
    validacionService.getAllPuntosSinValidar().subscribe(p => {
      this.puntos = p;
    });
    validacionService.getAllItemsSinValidar().subscribe(i => {
      this.items = i;
    });
    validacionService.getAllMaterialesSinValidar().subscribe(m => {
      this.materiales = m;
    });
  }

  ngOnInit(): void {
  }

  public getTipoContenedor(id: number): TipoContenedor {
    return this.tipoContenedorService.getTipoById(id);
  }

  validarMaterial(material: Material) {
    this.validacionService.validarMaterial(material).subscribe(() => {
      this.deleteFromArray(this.materiales, material);
    });
  }

  validarPunto(punto: Punto) {
    this.validacionService.validarPunto(punto).subscribe(() => {
      this.deleteFromArray(this.puntos, punto);
    });
  }

  validarItem(item: Item) {
    this.validacionService.validarItem(item).subscribe(() => {
      this.deleteFromArray(this.items, item);
    });
  }

  descartarMaterial(material: Material) {
    this.validacionService.descartarMaterial(material).subscribe(() => {
      this.deleteFromArray(this.materiales, material);
    });
  }

  descartarPunto(punto: Punto) {
    this.validacionService.descartarPunto(punto).subscribe(() => {
      this.deleteFromArray(this.puntos, punto);
    });
  }

  descartarItem(item: Item) {
    this.validacionService.descartarItem(item).subscribe(() => {
      this.deleteFromArray(this.items, item);
    });
  }

  deleteFromArray(array: any[], element: any): void {
    const index = array.indexOf(element);
    if (index > -1) {
      array.splice(index, 1);
    }
  }
}
