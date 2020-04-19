import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Nota} from '../../shared/models/nota';
import {TipoAccion} from '../../shared/models/accion';
import {NotaService} from '../../shared/services/nota.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TipoaccionService} from '../../shared/services/tipoaccion.service';

@Component({
  selector: 'app-form-tipoaccion',
  templateUrl: './form-tipoaccion.component.html',
  styleUrls: ['./form-tipoaccion.component.css']
})
export class FormTipoaccionComponent implements OnInit {
  public formulario: FormGroup;
  tipoAccion: TipoAccion = new TipoAccion();


  constructor(protected tipoaccionservice: TipoaccionService, protected router: Router, protected route: ActivatedRoute) { }

  ngOnInit(): void {
    this.formulario = new FormGroup({
      nombre: new FormControl(null, [Validators.required, Validators.maxLength(255)]),
      puntuacion: new FormControl(null, [Validators.required]),
    });
  }
  public nombre(): AbstractControl {
    return this.formulario.get('nombre');
  }

  public puntuacion(): AbstractControl {
    return this.formulario.get('puntuacion');
  }
  onSubmit() {
    this.tipoAccion.Nombre = this.nombre().value;
    this.tipoAccion.Puntuacion = this.puntuacion().value;
    this.tipoaccionservice.crear(this.tipoAccion).subscribe(id => {
      this.router.navigate(['/tipoaccion']);
    });
  }

}
