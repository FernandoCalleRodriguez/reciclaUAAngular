import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AccionReciclar} from '../models/accion';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccionreciclarService {
  server = 'https://reciclaua-admin.azurewebsites.net/api/';
  private token = localStorage.getItem('ACCESS_TOKEN');
  private headers: HttpHeaders = new HttpHeaders({Authorization: this.token});

  constructor(private http: HttpClient) { }

  public obtenerTodosAccionReciclar(): Observable<AccionReciclar[]> {
    return this.http.get<AccionReciclar[]>(this.server + 'AccionReciclar/BuscarTodos',{headers: this.headers}).pipe(map(res => {
      return res;
    }));
  }

  public obtenerAccionReciclarPorId(id: number): Observable<AccionReciclar> {
    return this.http.get<AccionReciclar>(this.server + 'AccionReciclar/' + id,{headers: this.headers});
  }

  public borrar(accion: AccionReciclar): Observable<void> {
    return this.http.delete<void>(this.server + 'AccionReciclar/Borrar?p_accionreciclar_oid=' + accion.Id,{headers: this.headers});
  }

}
