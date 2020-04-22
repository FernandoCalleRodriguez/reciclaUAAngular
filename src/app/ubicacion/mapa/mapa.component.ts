import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import * as L from 'leaflet';
import 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/images/marker-icon-2x.png';
import 'leaflet/dist/images/marker-icon.png';
import 'leaflet/dist/images/layers.png';
import 'leaflet/dist/images/layers-2x.png';
import {LeafletDirective} from '@asymmetrik/ngx-leaflet';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  public map: L.Map;
  public mlat: number;
  public mlong: number;
  public marker: L.Marker;
  public position: L.Circle;

  @ViewChild(LeafletDirective)
  public leaflet: LeafletDirective;

  @Output() out = new EventEmitter<L.LatLng>();

  constructor() {
  }

  ngOnInit(): void {
  }

  addMarker(e) {
    if (this.marker) {
      this.map.removeLayer(this.marker);
    }
    this.marker = L.marker([e.latlng.lat, e.latlng.lng]);
    this.marker.addTo(this.map);
    this.out.emit(e.latlng);
  }

  onMapReady(map: L.Map) {
    this.map = map;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.mlat = position.coords.latitude;
        this.mlong = position.coords.longitude;
        this.map.setView(new L.LatLng(this.mlat, this.mlong), 20);
        this.position = L.circle([this.mlat, this.mlong], {color: 'blue', fillColor: 'blue', fillOpacity: 0.3, radius: 8});
        this.position.addTo(this.map);
      });
    }
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
  }
}
