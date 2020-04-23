import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import * as L from 'leaflet';
import 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/images/marker-icon-2x.png';
import 'leaflet/dist/images/marker-icon.png';
import 'leaflet/dist/images/layers.png';
import 'leaflet/dist/images/layers-2x.png';
import {LeafletDirective} from '@asymmetrik/ngx-leaflet';
import 'leaflet-easybutton/src/easy-button';
import {timer} from 'rxjs';

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

  public mtimer = timer(4000);

  @ViewChild(LeafletDirective)
  public leaflet: LeafletDirective;

  @Output() coordinatesChange = new EventEmitter<L.LatLng>();

  constructor() {
  }

  ngOnInit(): void {
    this.refreshLocation();
  }

  addMarker(e) {
    this.setMarker(e.latlng);
  }

  public setMarker(latlng: L.LatLng) {
    if (this.marker) {
      this.map.removeLayer(this.marker);
    }
    this.marker = L.marker([latlng.lat, latlng.lng]);
    this.marker.addTo(this.map);
    this.coordinatesChange.emit(latlng);
    this.map.flyTo(latlng);
  }

  onMapReady(map: L.Map) {
    this.map = map;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.mlat = position.coords.latitude;
        this.mlong = position.coords.longitude;
        this.map.setView(new L.LatLng(this.mlat, this.mlong), 20);
        this.position = this.getCircle();
        this.position.addTo(this.map);
        L.easyButton('fa-user', () => {
          this.map.flyTo(new L.LatLng(this.mlat, this.mlong), 18);
        }).addTo(this.map);
      });
    }
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
  }

  private getCircle(): L.Circle {
    return L.circle([this.mlat, this.mlong], {color: 'blue', fillColor: 'blue', fillOpacity: 0.3, radius: 8});
  }

  private refreshLocation() {
    this.mtimer.subscribe((value) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          this.mlat = position.coords.latitude;
          this.mlong = position.coords.longitude;
          this.mtimer = timer(5000);
          this.refreshLocation();
        });
      }
    });
  }
}
