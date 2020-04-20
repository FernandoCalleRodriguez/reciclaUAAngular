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

  public obtenerTodosAccionWeb(): Observable<AccionWeb[]> {
    console.log()
    return this.http.get<AccionWeb[]>(this.server + 'AccionWeb/BuscarTodos', {headers: this.headers});
  }

  public obtenerAccionWebPorId(id: number): Observable<AccionWeb> {
    return this.http.get<AccionWeb>(this.server + 'AccionWeb/' + id,{headers: this.headers});
  }

  public borrar(accion: AccionWeb): Observable<void> {
    return this.http.delete<void>(this.server + 'AccionWeb/Borrar?p_accionweb_oid=' + accion.Id,{headers: this.headers});
  }

}
