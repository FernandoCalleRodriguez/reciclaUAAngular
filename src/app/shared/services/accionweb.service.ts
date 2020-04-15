import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Nota} from '../models/nota';
import {map} from 'rxjs/operators';
import {AccionWeb} from '../models/accion';
import {Observable} from 'rxjs';
import {Usuario} from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AccionwebService {
  server = 'http://localhost:16209/api/';
  private token = localStorage.getItem('ACCESS_TOKEN');
  private headers: HttpHeaders = new HttpHeaders({Authorization: this.token});
  AccionWeb: AccionWeb;
  constructor(private http: HttpClient) { }

  obtenerTodosAccionWeb() {
    return this.http.get<AccionWeb[]>(this.server + 'AccionWeb/BuscarTodos').pipe(map(res => {
      return res;
    }));
  }

  public crear(accion: AccionWeb): Observable<any> {
    // const body = { Tipo_oid: accion.Tipo.Id, Usuario_oid: accion.Usuario.Id }
    const body = {Tipo_oid: 458752, Usuario_oid: 32768, Fecha: accion.Fecha };
    return this.http.post<any>(this.server + 'AccionWeb/Crear', body);
  }




}
