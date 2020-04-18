import { Injectable } from '@angular/core';
import {Nota} from '../models/nota';
import {map} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TipoAccion} from '../models/accion';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoaccionService {
  server = 'http://localhost:16209/api/';
  // private token = localStorage.getItem('ACCESS_TOKEN');
  // private headers: HttpHeaders = new HttpHeaders({Authorization: this.token});

  constructor(private http: HttpClient) {
  }

  public obtenerTodosTipoAccion(): Observable<TipoAccion[]> {
    return this.http.get<TipoAccion[]>(this.server + 'TipoAccion/BuscarTodos').pipe(map(res => {
      return res;
    }));
  }

  public obtenerTipoAccionPorId(id: number) {
    return this.http.get<TipoAccion>(this.server + 'TipoAccion/' + id).pipe(map((res: TipoAccion) => {
      return res;
    }));
  }

  public crear(tipoAccion: TipoAccion): Observable<TipoAccion> {
    return this.http.post<TipoAccion>(this.server + 'TipoAccion/Crear', tipoAccion);
  }

  public borrar(tipoAccion: TipoAccion): Observable<void> {
    return this.http.delete<void>(this.server + 'TipoAccion/Borrar?p_tipoaccion_oid=' + tipoAccion.Id);
  }

  public modificar(tipoAccion: TipoAccion): Observable<any> {
    console.log(tipoAccion);
    return this.http.put<Nota>(this.server + 'TipoAccion/Modificar?idTipoAccion=' + tipoAccion.Id, tipoAccion);
  }

}


