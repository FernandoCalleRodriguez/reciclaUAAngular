import { Injectable } from '@angular/core';
import {Nota} from '../models/nota';
import {map} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TipoAccion} from '../models/accion';

@Injectable({
  providedIn: 'root'
})
export class TipoaccionService {
  server = 'http://localhost:16209/api/';
  // private token = localStorage.getItem('ACCESS_TOKEN');
  // private headers: HttpHeaders = new HttpHeaders({Authorization: this.token});

  constructor(private http: HttpClient) {
  }

  public obtenerTipoAccionPorId(id) {
    return this.http.get<TipoAccion>(this.server + 'TipoAccion/' + id).pipe(map((res: TipoAccion) => {
      return res;
    }));
  }

}


