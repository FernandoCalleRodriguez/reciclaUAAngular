import { Punto } from '../models/punto';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PuntoService {
  SERVER = 'http://localhost:16209/api/PuntoReciclaje/';

  private token = localStorage.getItem('ACCESS_TOKEN');
  private headers: HttpHeaders = new HttpHeaders({ Authorization: this.token });

  constructor(private http: HttpClient) {
  }

  public getPunto(): Observable<Punto[]> {
    return this.http.get<Punto[]>(this.SERVER + 'BuscarTodos', { headers: this.headers });
  }

  public setPunto(punto: Punto): Observable<Punto> {
    return this.http.post<Punto>(this.SERVER + 'Crear', punto, { headers: this.headers });
  }

  public removePunto(id: number) {
    return this.http.delete<Punto>(this.SERVER + 'Borrar?p_puntoreciclaje_oid=' + id, { headers: this.headers });
  }

  public updatePunto(punto: Punto) {
    return this.http.put<Punto>(this.SERVER + 'Modificar?idPuntoReciclaje=' + punto.Id, punto, { headers: this.headers });
  }

  public getPuntoById(id: number) {
    return this.http.get<Punto>(this.SERVER + id, {headers: this.headers});
  }

  public countPuntos(): Observable<number> {
    return this.http.get<number>(this.SERVER + 'BuscarPuntosCount', {headers: this.headers});
  }

  public getPuntoByContenedor(id: number): Observable<Punto> {
    return this.http.get<Punto>(this.SERVER + 'BuscarPuntoPorContenedor?contenedor_id=' + id, {headers: this.headers});
  }

  // NO SE HAN UTILIZADO AUN
  public getPuntoByPlanta(idPlanta: number, idEdificio: number) {
    return this.http.get<Punto[]>(this.SERVER + 'BuscarPuntosPorPlanta?id_edificio=' + idEdificio + '&num_planta=' + idPlanta, { headers: this.headers });
  }

  public getPuntoByEstancia(idEstancia: number) {
    return this.http.get<Punto[]>(this.SERVER + 'BuscarPuntosPorPlanta?id_estancia=' + idEstancia, { headers: this.headers });
  }

  public getPuntoByValidar() {
    return this.http.get<Punto[]>(this.SERVER + 'BuscarPuntosPorValidar', { headers: this.headers });
  }

  public getPuntoByValidados() {
    return this.http.get<Punto[]>(this.SERVER + 'BuscarPuntosValidados', { headers: this.headers });
  }

  public getPuntoByUsuario(ID_USER: number) {
    return this.http.get<Punto[]>(this.SERVER + 'BuscarPuntosPorUsuario?id_usuario=' + ID_USER, { headers: this.headers });
  }
  public puntosCount(): Observable<number> {
    return this.http.get<number>(this.SERVER + "puntosCount", { headers: this.headers })
  }
}
