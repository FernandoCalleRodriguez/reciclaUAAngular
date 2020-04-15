import { Component, OnInit } from '@angular/core';
import {TipoAccion} from '../../shared/models/accion';
import {TipoaccionService} from '../../shared/services/tipoaccion.service';

@Component({
  selector: 'app-tipoaccion',
  templateUrl: './tipoaccion.component.html',
  styleUrls: ['./tipoaccion.component.css']
})
export class TipoaccionComponent implements OnInit {
  TipoAcciones: TipoAccion[];
  TipoAccion: TipoAccion;

  constructor(private  tipoaccionservice: TipoaccionService) { }

  ngOnInit(): void {
    this.obtenerTodosTipoAccion();
  }

  obtenerTodosTipoAccion() {
    this.tipoaccionservice.obtenerTodosTipoAccion().subscribe(acciones => {
      this.TipoAcciones = acciones;
      console.log('Acciones Web:' + acciones);
    });
  }

  obtenerTodosAWporId() {
    this.tipoaccionservice.obtenerTipoAccionPorId(458752).subscribe(accion => {
      this.TipoAccion = accion;
      console.log('Tipo de accion:' + accion);
    });
  }

  crearTipoAccion(){
    const tipoaccionPrueba: TipoAccion = {Puntuacion: 300 , Nombre: 'Tipo 14'};
    this.tipoaccionservice.crear(tipoaccionPrueba).subscribe(accion => {
      console.log('Tipo de accion creada:' + accion);
    });
  }

  modificarTipoAccion(){
    this.tipoaccionservice.obtenerTipoAccionPorId(655361).subscribe(accion => {
      this.TipoAccion = accion;
      console.log('Tipo de accion:' + accion);
    });

    const tipoaccionPrueba: TipoAccion = {Id: this.TipoAccion.Id , Puntuacion: 1000 , Nombre: 'Tipo 14 Modificada'};
    this.tipoaccionservice.modificar(tipoaccionPrueba).subscribe(res => {
      console.log(res);
    });
  }

  borrarTipoAccion() {
    const id = 655360;
    this.tipoaccionservice.borrar(id).subscribe( accion => {
      console.log('Se elimino la accion web ' + id);
    });
  }

}
