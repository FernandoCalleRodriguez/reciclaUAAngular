import { Edificio } from './../models/Edificio';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EdificioService {
  SERVER = 'http://localhost:16209/api/Edificio/';
  constructor(private http: HttpClient) { }


  public getEdificio(): Observable<Edificio[]> {
    return this.http.get<Edificio[]>(this.SERVER + "BuscarTodos")
  }
  public setEdificio(edificio: Edificio): Observable<Edificio> {
    return this.http.post<Edificio>(this.SERVER + "Crear", edificio);
  }
  public removeEdificio(id: number) {
    return this.http.delete<Edificio>(this.SERVER + "Borrar?p_edificio_oid=" + id);
  }
  public updateEdificio(edificio: Edificio) {
    return this.http.put<Edificio>(this.SERVER + "Modificar?idEdificio=" + edificio.Id, edificio);
  }
  public getEdificioById(id) {
    return this.http.get<Edificio>(this.SERVER + id);
  }
  public getEdificioByNombre(id) {
    return this.http.get<Edificio>(this.SERVER + "EdificioNombre?idNombre=" + id);
  }
}
