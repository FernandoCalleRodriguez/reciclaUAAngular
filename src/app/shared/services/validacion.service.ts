import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Duda} from '../models/duda';
import {Punto} from '../models/punto';
import {Material} from '../models/material';
import {Item} from '../models/item';
import {Estado} from '../models/estado';

@Injectable({
  providedIn: 'root'
})
export class ValidacionService {
  private SERVER = 'http://localhost:16209/api/';
  private TOKEN = localStorage.getItem('ACCESS_TOKEN');
  private headers: HttpHeaders = new HttpHeaders({Authorization: this.TOKEN});

  private estados: Estado[] = [
    {
      Id: 1,
      Estado: 'Validado'
    },
    {
      Id: 2,
      Estado: 'Pendiente'
    },
    {
      Id: 3,
      Estado: 'Descartado'
    }
  ];

  constructor(protected http: HttpClient) {
  }

  public getAllPuntosSinValidar(): Observable<Punto[]> {
    return this.http.get<Punto[]>(this.SERVER + 'PuntoReciclaje/BuscarPuntosPorValidar', {headers: this.headers});
  }

  public getAllMaterialesSinValidar(): Observable<Material[]> {
    return this.http.get<Material[]>(this.SERVER + 'Material/BuscarMaterialesPorValidar', {headers: this.headers});
  }

  public getAllItemsSinValidar(): Observable<Item[]> {
    return this.http.get<Item[]>(this.SERVER + 'Item/BuscarItemsPorValidar', {headers: this.headers});
  }

  public getEstados(): Estado[] {
    return this.estados;
  }

  public getEstadoById(id: number): Estado {
    return this.estados.find(e => e.Id === id);
  }
}
