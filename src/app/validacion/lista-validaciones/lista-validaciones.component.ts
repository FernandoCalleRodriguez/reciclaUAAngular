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
}
