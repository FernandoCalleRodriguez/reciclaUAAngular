import { Punto } from './../models/Punto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PuntoService {
  SERVER = 'http://localhost:16209/api/PuntoReciclaje/';
  constructor(private http: HttpClient) { }

  public getPunto(): Observable<Punto[]> {
    return this.http.get<Punto[]>(this.SERVER + "BuscarTodos")
  }
  public setPunto(punto: Punto): Observable<Punto> {
    return this.http.post<Punto>(this.SERVER + "Crear", punto);
  }
  public removePunto(id: number) {
    return this.http.delete<Punto>(this.SERVER + "Borrar?p_puntoreciclaje_oid=" + id);
  }
  public updatePunto(punto: Punto) {
    return this.http.put<Punto>(this.SERVER + "Modificar?idPuntoReciclaje=" + punto.Id, punto);
  }
  public getPuntoById(id: number) {
    return this.http.get<Punto>(this.SERVER + id);
  }
  public getPuntoByPlanta(idPlanta: number,idEdificio:number) {
    return this.http.get<Punto[]>(this.SERVER +"BuscarPuntosPorPlanta?id_edificio="+idEdificio+"&num_planta="+idPlanta);
  }

  
 
}
