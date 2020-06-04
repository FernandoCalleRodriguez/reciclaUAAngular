import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Estancia } from '../models/estancia';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EstanciaService {
  SERVER = 'http://reciclaua-admin.azurewebsites.net/api/Estancia/';
  private token = localStorage.getItem('ACCESS_TOKEN');
  private headers: HttpHeaders = new HttpHeaders({ Authorization: this.token });

  constructor(private http: HttpClient) {
  }

  public getEstancia(): Observable<Estancia[]> {
    return this.http.get<Estancia[]>(this.SERVER + 'BuscarTodos', { headers: this.headers });
  }

  public setEstancia(estancia: Estancia): Observable<Estancia> {
    return this.http.post<Estancia>(this.SERVER + 'Crear', estancia, { headers: this.headers });
  }

  public getEstanciaById(id: number): Observable<Estancia> {
    return this.http.get<Estancia>(this.SERVER + id, { headers: this.headers });
  }

  public removeEstancia(id: number) {
    return this.http.delete<Estancia>(this.SERVER + 'Borrar?p_estancia_oid=' + id, { headers: this.headers });
  }

  public updateEstancia(estancia: Estancia) {
    return this.http.put<Estancia>(this.SERVER + 'Modificar?idEstancia=' + estancia.Id, estancia, { headers: this.headers });
  }

}
