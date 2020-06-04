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
  private SERVER = 'http://reciclaua-admin.azurewebsites.net/api/';
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

  public countAllPuntosSinValidar(): Observable<number> {
    return this.http.get<number>(this.SERVER + 'PuntoReciclaje/BuscarPuntosPorValidarCount', {headers: this.headers});
  }

  public countAllMaterialesSinValidar(): Observable<number> {
    return this.http.get<number>(this.SERVER + 'Material/BuscarMaterialesPorValidarCount', {headers: this.headers});
  }

  public countAllItemsSinValidar(): Observable<number> {
    return this.http.get<number>(this.SERVER + 'Item/BuscarItemsPorValidarCount', {headers: this.headers});
  }

  public validarPunto(punto: Punto): Observable<void> {
    return this.http.post<void>(this.SERVER + 'PuntoReciclaje/ValidarPunto?p_oid=' + punto.Id, null, {headers: this.headers});
  }

  public validarMaterial(material: Material): Observable<void> {
    return this.http.post<void>(this.SERVER + 'Material/ValidarMaterial?p_oid=' + material.Id, null, {headers: this.headers});
  }

  public validarItem(item: Item, puntuacion: number): Observable<void> {
    return this.http.post<void>(this.SERVER + 'Item/ValidarItem?p_oid=' + item.Id + '&p_puntuacion=' + puntuacion, null, {headers: this.headers});
  }

  public descartarPunto(punto: Punto): Observable<void> {
    return this.http.post<void>(this.SERVER + 'PuntoReciclaje/DescartarPunto?p_oid=' + punto.Id, null, {headers: this.headers});
  }

  public descartarMaterial(material: Material): Observable<void> {
    return this.http.post<void>(this.SERVER + 'Material/DescartarMaterial?p_oid=' + material.Id, null, {headers: this.headers});
  }

  public descartarItem(item: Item): Observable<void> {
    return this.http.post<void>(this.SERVER + 'Item/DescartarItem?p_oid=' + item.Id, null, {headers: this.headers});
  }

  public getEstados(): Estado[] {
    return this.estados;
  }

  public getEstadoById(id: number): Estado {
    return this.estados.find(e => e.Id === id);
  }
}
