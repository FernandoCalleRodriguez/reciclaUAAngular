import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Planta, PlantaEnum} from '../models/planta';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlantaService {
  SERVER = 'https://reciclaua-admin.azurewebsites.net/api/Planta/';
  private token = localStorage.getItem('ACCESS_TOKEN');
  private headers: HttpHeaders = new HttpHeaders({ Authorization: this.token });
  private tipoPlantas: PlantaEnum[] = [
    {
      Id: 1,
      Planta: 'Planta Baja'
    },
    {
      Id: 2,
      Planta: 'P1'
    },
    {
      Id: 3,
      Planta: 'P2'
    },
    {
      Id: 4,
      Planta: 'P3'
    },
    {
      Id: 5,
      Planta: 'P4'
    },
    {
      Id: 6,
      Planta: 'Sótano'
    }
  ]

  constructor(private http: HttpClient) { }

  public getPlanta(): Observable<Planta[]> {
    return this.http.get<Planta[]>(this.SERVER + "BuscarTodos", { headers: this.headers })
  }
  public setPlanta(planta: Planta): Observable<Planta> {
    return this.http.post<Planta>(this.SERVER + "Crear", planta, { headers: this.headers })
  }

  public getPlantaById(id: number): Observable<Planta> {
    return this.http.get<Planta>(this.SERVER + id, { headers: this.headers })
  }

  public removePlanta(id: number) {
    return this.http.delete<Planta>(this.SERVER + "Borrar?p_planta_oid=" + id, { headers: this.headers });
  }

  public updatePlanta(planta: Planta) {
    return this.http.put<Planta>(this.SERVER + "Modificar?idPlanta=" + planta.Id, planta, { headers: this.headers });
  }

  public getTiposPlanta(): PlantaEnum[] {
    return this.tipoPlantas;
  }

  public getTipoPlantaById(id: number): PlantaEnum {
    return this.tipoPlantas.find(t => t.Id === id);
  }

}
