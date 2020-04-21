import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Nivel } from '../models/nivel';

@Injectable({
  providedIn: 'root'
})
export class NivelService {
  SERVER = 'http://localhost:16209/api/Nivel/';
  constructor(private http: HttpClient) { }


  public getNivel(): Observable<Nivel[]> {
    return this.http.get<Nivel[]>(this.SERVER + "BuscarTodos")
  }
  public setNivel(nivel: Nivel): Observable<Nivel> {
    return this.http.post<Nivel>(this.SERVER + "Crear", nivel);
  }
  public removeNivel(id: number) {
    return this.http.delete<Nivel>(this.SERVER + "Borrar?p_nivel_oid=" + id);
  }
  public getNivelById(id) {
    return this.http.get<Nivel>(this.SERVER + id);
  }
  public updateNivel(nivel: Nivel) {
    return this.http.put<Nivel>(this.SERVER + "Modificar?idNivel=" + nivel.Id, nivel);
  }
  public getNivelByItem(id) {
    return this.http.get<Nivel>(this.SERVER + "NivelItem?idItem=" + id);
  }
  public assignItem(idNivel, items: number[]) {
    return this.http.put("http://localhost:16209/api/AccionReciclar/294912/ItemAccion/" + items[0] + "/NivelItem/AsignarItems?p_nivel_oid="+idNivel, items)
  }
  public desassignarItems(idNivel,items:number[]){
    return this.http.put("http://localhost:16209/api/AccionReciclar/294912/ItemAccion/" + items[0] + "/NivelItem/DesasignarItems?p_nivel_oid="+idNivel,items);
  }

}
