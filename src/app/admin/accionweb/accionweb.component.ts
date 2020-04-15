import { Component, OnInit } from '@angular/core';
import {AccionwebService} from '../../shared/services/accionweb.service';
import {AccionWeb, TipoAccion} from '../../shared/models/accion';
import {TipoaccionService} from '../../shared/services/tipoaccion.service';
import {UsuarioService} from '../../shared/services/usuario.service';
import {Usuario} from '../../shared/models/usuario';

@Component({
  selector: 'app-accionweb',
  templateUrl: './accionweb.component.html',
  styleUrls: ['./accionweb.component.css']
})
export class AccionwebComponent implements OnInit {

  AccionesWeb: AccionWeb[];
  AccionWeb: AccionWeb;
  Usuario: Usuario;

  constructor(private accionwebservice: AccionwebService) { }

  ngOnInit(): void {
    this.obtenerTodosAW();
  }

  obtenerTodosAW() {
    this.accionwebservice.obtenerTodosAccionWeb().subscribe(acciones => {
    this.AccionesWeb = acciones;
    console.log('Acciones Web:' + acciones);
    });
  }

  obtenerTodosAWporId() {
    this.accionwebservice.obtenerAccionWebPorId(294912).subscribe(accion => {
      this.AccionWeb = accion;
      console.log('Acciones Web:' + accion);
    });
  }

  borrarAccion() {
      const id = 491520;
      this.accionwebservice.borrar(id).subscribe( accion => {
      console.log('Se elimino la accion web ' + id);
  });
  }

}
