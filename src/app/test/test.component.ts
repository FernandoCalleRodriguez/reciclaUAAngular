import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {MapaComponent} from '../ubicacion/mapa/mapa.component';
import * as L from 'leaflet';
import {PuntoService} from '../shared/services/punto.service';
import {Punto} from '../shared/models/punto';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  public formulario: FormGroup;
  public puntos: Punto[] = null;

  @ViewChild(MapaComponent)
  mapa: MapaComponent;

  constructor(protected puntoService: PuntoService) {
    puntoService.getPunto().subscribe(p => {
      this.puntos = p;
    });
  }

  ngOnInit(): void {
    this.formulario = new FormGroup({
      latitud: new FormControl(null, [Validators.required]),
      longitud: new FormControl(null, [Validators.required])
    });
  }

  latitud(): AbstractControl {
    return this.formulario.get('latitud');
  }

  longitud(): AbstractControl {
    return this.formulario.get('longitud');
  }

  onCoordinatesChange(coordinates: L.LatLng) {
    this.latitud().setValue(coordinates.lat);
    this.longitud().setValue(coordinates.lng);
  }

  onSubmit() {

  }

  showCoordinates() {
    if (this.latitud().valid && this.longitud().valid) {
      this.mapa.setMarker(new L.LatLng(this.latitud().value, this.longitud().value));
    }
  }
}
