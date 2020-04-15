import { Component, OnInit } from '@angular/core';
import {Nota} from '../../shared/models/nota';
import {NotaService} from '../../shared/services/nota.service';

@Component({
  selector: 'app-nota',
  templateUrl: './nota.component.html',
  styleUrls: ['./nota.component.css']
})
export class NotaComponent implements OnInit {
  Notas: Nota[];
  Nota: Nota;

  constructor(private notaservice: NotaService) { }

  ngOnInit(): void {
    this.obtenerTodasNotas();
    this.crear();
  }

  obtenerNotaId() {
    this.notaservice.obtenerNotaPorId(393216).subscribe(nota => {
      this.Nota = nota;
      console.log('Nota por ID' + this.Notas);
    });
  }

  obtenerTodasNotas() {
    this.notaservice.obtenerTodasNotas().subscribe(notas => {
      this.Notas = notas;
      console.log('Obtener todas las notas ' + this.Notas);
    });
  }

  crear(): void {
    this.notaservice.crear(32768, 'Reciclaje 2.0', 'Tecnologias que ayudan al reciclaje').subscribe(res => {
      console.log(res);
    });
  }

  borrarNota(): void {
    const notaPrueba: Nota = {Id: 425984};
    console.log(notaPrueba);
    this.notaservice.borrar(notaPrueba).subscribe(res => {
      console.log(res);
    });
  }

  modificarNota(): void {
    const date: Date = new Date();
    const notaPrueba: Nota = {Id: 425985, Titulo: 'Nota Modificada', Cuerpo: 'Cuerpo nota modificada', Fecha: date};
    console.log(notaPrueba);
    this.notaservice.modificar(notaPrueba).subscribe(res => {
      console.log(res);
    });
  }





}
