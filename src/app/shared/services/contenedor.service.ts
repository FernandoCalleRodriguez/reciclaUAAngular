import { Contenedor } from './../models/Contenedor';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContenedorService {
  SERVER = 'http://localhost:16209/api/Contenedor/';
  constructor(private http: HttpClient) { }

  public getContenedor(): Observable<Contenedor[]> {
    return this.http.get<Contenedor[]>(this.SERVER + "BuscarTodos")
  }
  public setContenedor(contenedor: Contenedor): Observable<Contenedor> {
    return this.http.post<Contenedor>(this.SERVER + "Crear", contenedor);
  }
  public removeContenedor(id: number) {
    return this.http.delete<Contenedor>(this.SERVER + "Borrar?p_contenedor_oid=" + id);
  }
  public updateContenedor(contenedor: Contenedor) {
    return this.http.put<Contenedor>(this.SERVER + "Modificar?idContenedor=" + contenedor.Id, contenedor);
  }
  public getContenedorById(id: number) {
    return this.http.get<Contenedor>(this.SERVER + id);
  }

}
