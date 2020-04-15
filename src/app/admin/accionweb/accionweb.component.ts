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
  TipoAccion: TipoAccion;
  Usuario: Usuario;

  constructor(private accionwebservice: AccionwebService,
              private tipoaccionservice: TipoaccionService,
              private usuarioservice: UsuarioService) { }

  ngOnInit(): void {
    this.obtenerTodosAW();
    this.crearAccion();
  }

  obtenerTodosAW() {
    this.accionwebservice.obtenerTodosAccionWeb().subscribe(acciones => {
    this.AccionesWeb = acciones;
    console.log('Acciones Web:' + acciones);
    });
  }

  crearAccion() {
    this.tipoaccionservice.obtenerTipoAccionPorId(262144).subscribe( tipo => {
      this.TipoAccion = tipo;
      console.log(tipo);
    });

    this.usuarioservice.obtenerWebPorId(32769).subscribe( usu => {
      this.Usuario = usu;
      console.log(usu);
    });

    const date: Date = new Date();
    const accionPrueba: AccionWeb = {Tipo: this.TipoAccion, Fecha: date, Usuario: this.Usuario };
    this.accionwebservice.crear(accionPrueba).subscribe( res => {
      console.log(res);
    });
  }

  modificarAccion() {
    this.accionwebservice.modificar(this.AccionWeb).subscribe( accion => {
      this.AccionWeb = accion;
      console.log('Se modifica la opcion ' + accion);
  });
  }

  borrarAccion() {
      const id = 557060;
      this.accionwebservice.borrar(id).subscribe( accion => {
      console.log('Se elimino la accion web ' + id);
  });
  }

}
