import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Planta } from '../models/Planta';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlantaService {
  SERVER = 'http://localhost:16209/api/Planta/';
  constructor(private http: HttpClient) { }
  
  public getPlanta(): Observable<Planta[]> {
    return this.http.get<Planta[]>(this.SERVER + "BuscarTodos")
  }
  public setPlanta(planta: Planta) :Observable<Planta>{
    return this.http.post<Planta>(this.SERVER + "Crear", planta)
  }

  public getPlantaById(id:number):Observable<Planta>{
    return this.http.get<Planta>(this.SERVER + id)
  }

  public removePlanta(id: number) {
    return this.http.delete<Planta>(this.SERVER + "Borrar?p_planta_oid=" + id);
  }
  
  public updatePlanta(planta: Planta) {
    return this.http.put<Planta>(this.SERVER + "Modificar?idPlanta=" + planta.Id, planta);
  }

}
