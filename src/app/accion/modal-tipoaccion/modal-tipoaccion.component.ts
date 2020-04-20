import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {TipoaccionService} from '../../shared/services/tipoaccion.service';
import {Observable} from 'rxjs';
import {TipoAccion} from '../../shared/models/accion';

@Component({
  selector: 'app-modal-tipoaccion',
  templateUrl: './modal-tipoaccion.component.html',
  styleUrls: ['./modal-tipoaccion.component.css']
})
export class ModalTipoaccionComponent implements OnInit {
  public formulario: FormGroup;
  public tipoAcccion: TipoAccion = new TipoAccion();
  public edit = false;

  @Input('IdTipoAccion')
  public Id: number;

  constructor(protected tipoaccionService: TipoaccionService) { }

  ngOnInit(): void {
    this.formulario = new FormGroup({
      nombre: new FormControl(null, [Validators.required]),
      puntuacion: new FormControl(null, [Validators.required]),
    });

    if (this.Id) {
      this.tipoaccionService.obtenerTipoAccionPorId(this.Id).subscribe(tipoAccion => {
        this.tipoAcccion = tipoAccion;
        console.log('Se activa el true');
        this.edit = true;
        this.nombre().setValue(tipoAccion.Nombre);
        this.puntuacion().setValue(tipoAccion.Puntuacion);
      });
    }
  }

  public nombre(): AbstractControl {
    return this.formulario.get('nombre');
  }

  public puntuacion(): AbstractControl {
    return this.formulario.get('puntuacion');
  }

  onSubmit(): Observable<TipoAccion> {
    if (this.formulario.valid ) {
      this.tipoAcccion.Nombre = this.nombre().value;
      this.tipoAcccion.Puntuacion = this.puntuacion().value;
      if (this.edit) {
        return this.tipoaccionService.modificar(this.tipoAcccion);
      } else {
        return this.tipoaccionService.crear(this.tipoAcccion);
      }
    }
  }

}
