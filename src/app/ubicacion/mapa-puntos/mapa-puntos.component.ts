import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import * as L from 'leaflet';
import {timer} from 'rxjs';
import {LeafletDirective} from '@asymmetrik/ngx-leaflet';
import {Punto} from '../../shared/models/punto';
import {PuntoService} from '../../shared/services/punto.service';
import {TipoContenedorService} from '../../shared/services/tipo-contenedor.service';

@Component({
  selector: 'app-mapa-puntos',
  templateUrl: './mapa-puntos.component.html',
  styleUrls: ['./mapa-puntos.component.css']
})
export class MapaPuntosComponent implements OnInit {
  public map: L.Map;
  public mlat: number;
  public mlong: number;
  public markers: L.Marker[] = [];
  public position: L.Circle;
  public mtimer = timer(4000);
  public actualMarker: L.Marker = null;

  @ViewChild(LeafletDirective)
  public leaflet: LeafletDirective;

  @Input()
  public puntos: Punto[] = [];

  @Input()
  public single = false;

  @Output()
  public selectedPuntoChange: EventEmitter<Punto> = new EventEmitter<Punto>();

  constructor(protected tipoContenedorService: TipoContenedorService) {
  }

  ngOnInit(): void {
    this.refreshLocation();
  }

  public setMarker(punto: Punto) {
    const latlng: L.LatLng = new L.LatLng(punto.Latitud, punto.Longitud);
    const marker = L.marker([latlng.lat, latlng.lng]);
    marker.addTo(this.map).on('click', () => {
      this.infoPunto(marker, punto);
    });
    this.markers.push(marker);
    marker.bindPopup(this.getPopup(punto));
  }

  onMapReady(map: L.Map) {
    this.map = map;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.mlat = position.coords.latitude;
        this.mlong = position.coords.longitude;
        if (!this.single) {
          this.map.setView(new L.LatLng(this.mlat, this.mlong), 20);
        }
        this.position = this.getCircle();
        this.position.addTo(this.map);
        L.easyButton('fa-user', () => {
          this.refresh();
        }).addTo(this.map);
        L.easyButton('fa-arrow-right', () => {
          if (this.puntos && this.puntos.length > 0) {
            if (!this.actualMarker) {
              this.actualMarker = this.markers[0];
            } else {
              const i = this.markers.indexOf(this.actualMarker);
              if (i + 1 >= this.markers.length) {
                this.actualMarker = this.markers[0];
              } else {
                this.actualMarker = this.markers[i + 1];
              }
            }
            this.map.flyTo(this.actualMarker.getLatLng(), 18);
            // this.actualMarker.openPopup();
            this.actualMarker.fire('click');
          }
        }).addTo(this.map);
        L.easyButton('fa-arrow-left', () => {
          if (this.puntos && this.puntos.length > 0) {
            if (!this.actualMarker) {
              this.actualMarker = this.markers[this.markers.length - 1];
            } else {
              const i = this.markers.indexOf(this.actualMarker);
              if (i - 1 < 0) {
                this.actualMarker = this.markers[this.markers.length - 1];
              } else {
                this.actualMarker = this.markers[i - 1];
              }
            }
            this.map.flyTo(this.actualMarker.getLatLng(), 18);
            // this.actualMarker.openPopup();
            this.actualMarker.fire('click');
          }
        }).addTo(this.map);
      });
    }
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
    this.puntos.forEach(p => {
      this.setMarker(p);
      // console.log(p.Latitud);
    });
    if (this.single) {
      this.map.setView(this.markers[0].getLatLng(), 20);
      this.actualMarker = this.markers[0];
      this.actualMarker.fire('click');
    }
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
          this.map.removeLayer(this.position);
          this.position = this.getCircle();
          this.position.addTo(this.map);
          this.refreshLocation();
        });
      }
    });
  }

  private infoPunto(marker: L.Marker, punto: Punto) {
    this.actualMarker = marker;
    this.selectedPuntoChange.emit(punto);
  }

  public setActualMarker(id: number) {
    if (id) {
      const index = this.puntos.findIndex(p => p.Id == id);
      if (index !== -1 && this.actualMarker != this.markers[index]) {
        this.actualMarker = this.markers[index];
        this.map.flyTo(this.actualMarker.getLatLng(), 18);
        this.actualMarker.openPopup();
      }
    } else {
      this.refresh();
    }
  }

  private getPopup(punto: Punto): L.Popup {
    let content = `<h4>Punto ${punto.Id}</h4><hr>`;
    if (punto.Contenedores && punto.Contenedores.length > 0) {
      const atipos = Array(this.tipoContenedorService.getTipos().length).fill(0);
      punto.Contenedores.forEach(c => {
        atipos[c.Tipo - 1]++;
      });
      content += `<h6>Contenedores:</h6>`;
      content += '<ul>';
      atipos.forEach((count, index) => {
        if (count > 0) {
          content += `<li>${this.tipoContenedorService.getTipoById(index + 1).Tipo} (${count})</li>`;
        }
      });
      content += '</ul>';
    } else {
      content += `<i>No hay contenedores</i>`;
    }
    content += '<hr>';
    content += `${punto.Latitud}, ${punto.Longitud}`;
    return new L.Popup().setContent(content);
  }

  public refresh() {
    this.map.flyTo(new L.LatLng(this.mlat, this.mlong), 18);
    this.markers.forEach(m => {
      m.closePopup();
    });
    this.actualMarker = null;
  }
}
