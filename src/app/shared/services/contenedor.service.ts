import { Contenedor } from '../models/contenedor';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContenedorService {
  SERVER = 'https://reciclaua-admin.azurewebsites.net/api/Contenedor/';
  private token = localStorage.getItem('ACCESS_TOKEN');
  private headers: HttpHeaders = new HttpHeaders({ Authorization: this.token });

  constructor(private http: HttpClient) { }

  public getContenedor(): Observable<Contenedor[]> {
    return this.http.get<Contenedor[]>(this.SERVER + "BuscarTodos", { headers: this.headers })
  }
  public setContenedor(contenedor: Contenedor): Observable<Contenedor> {
    return this.http.post<Contenedor>(this.SERVER + "Crear", contenedor, { headers: this.headers });
  }
  public removeContenedor(id: number) {
    return this.http.delete<Contenedor>(this.SERVER + "Borrar?p_contenedor_oid=" + id, { headers: this.headers });
  }
  public updateContenedor(contenedor: Contenedor) {
    return this.http.put<Contenedor>(this.SERVER + "Modificar?idContenedor=" + contenedor.Id, contenedor, { headers: this.headers });
  }
  public getContenedorById(id: number) {
    return this.http.get<Contenedor>(this.SERVER + id, { headers: this.headers });
  }

  public buscarPorTipo(tipo): Observable<Contenedor[]> {
    // console.log(tipo,"tititi")
    return this.http.get<Contenedor[]>(this.SERVER + "BuscarContenedoresPorTipo?tipo_contenedor="+tipo, { headers: this.headers })
  }
}
