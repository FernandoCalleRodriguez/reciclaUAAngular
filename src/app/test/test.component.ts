import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {MapaComponent} from '../ubicacion/mapa/mapa.component';
import * as L from 'leaflet';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  public formulario: FormGroup;

  @ViewChild(MapaComponent)
  mapa: MapaComponent;

  constructor() {
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
