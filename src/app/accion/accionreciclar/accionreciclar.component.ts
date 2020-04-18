import { Component, OnInit } from '@angular/core';
import {AccionwebService} from '../../shared/services/accionweb.service';
import {AccionreciclarService} from '../../shared/services/accionreciclar.service';
import {AccionReciclar} from '../../shared/models/accion';

@Component({
  selector: 'app-accionreciclar',
  templateUrl: './accionreciclar.component.html',
  styleUrls: ['./accionreciclar.component.css']
})
export class AccionreciclarComponent implements OnInit {
  AccionesReciclar: AccionReciclar[];
  AccionReciclar: AccionReciclar;

  constructor(private accionreciclarservice: AccionreciclarService) { }

  ngOnInit(): void {
    this.obtenerTodosAR();
  }
  obtenerTodosAR() {
    this.accionreciclarservice.obtenerTodosAccionReciclar().subscribe(acciones => {
      this.AccionesReciclar = acciones;
      console.log('Acciones Web:' + acciones);
    });
  }

  obtenerTodosARporId() {
    this.accionreciclarservice.obtenerAccionReciclarPorId(557074).subscribe(accion => {
      this.AccionReciclar = accion;
      console.log('Acciones Web:' + accion);
    });
  }

  borrarAccion() {
    const id = 557076;
    this.accionreciclarservice.borrar(id).subscribe( accion => {
      console.log('Se elimino la accion web ' + id);
    });
  }

}
