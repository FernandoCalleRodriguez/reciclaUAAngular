import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Estancia } from '../models/estancia';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EstanciaService {
  SERVER = 'http://localhost:16209/api/Estancia/';
  constructor(private http: HttpClient) { }

  public getEstancia(): Observable<Estancia[]> {
    return this.http.get<Estancia[]>(this.SERVER + "BuscarTodos")
  }
  public setEstancia(estancia: Estancia): Observable<Estancia> {
    //console.log(JSON.stringify(estancia));
    return this.http.post<Estancia>(this.SERVER + "Crear", estancia)
  }

  //public setEstancia(estancia: Estancia): Observable<Estancia> {
  //return this.http.post<Estancia>(this.SERVER + "Crear", estancia)
  //}

  public getEstanciaById(id: number): Observable<Estancia> {
    return this.http.get<Estancia>(this.SERVER + id)
  }

  public removeEstancia(id: number) {
    return this.http.delete<Estancia>(this.SERVER + "Borrar?p_estancia_oid=" + id);
  }

  public updateEstancia(estancia: Estancia) {
    return this.http.put<Estancia>(this.SERVER + "Modificar?idEstancia=" + estancia.Id, estancia);
  }

}
