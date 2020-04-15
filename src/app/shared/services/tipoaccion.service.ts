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

  public obtenerTipoAccionPorId(id) {
    return this.http.get<TipoAccion>(this.server + 'TipoAccion/' + id).pipe(map((res: TipoAccion) => {
      return res;
    }));
  }

  public crear(tipoaccion: TipoAccion): Observable<number> {
    return this.http.post<number>(this.server + 'TipoAccion/Crear', tipoaccion);
  }

  public borrar(id: number): Observable<void> {
    return this.http.delete<void>(this.server + 'TipoAccion/Borrar?p_tipoaccion_oid=' + id);
  }

  public modificar(tipoaccion: TipoAccion): Observable<any> {
    console.log(tipoaccion);
    return this.http.put<Nota>(this.server + 'TipoAccion/Modificar?idTipoAccion=' + tipoaccion.Id, tipoaccion);
  }

}


