import {ItemService} from './item.service';
import {Item} from './../models/item';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Nivel} from '../models/nivel';


@Injectable({
  providedIn: 'root'
})
export class NivelService {
  SERVER = 'http://localhost:16209/api/Nivel/';
  private TOKEN = localStorage.getItem('ACCESS_TOKEN');
  private headers: HttpHeaders = new HttpHeaders({Authorization: this.TOKEN});

  constructor(private itemService: ItemService, private http: HttpClient) {
  }

  itemNivel: { item: Item, nivel: Nivel }[] = [];

  public getNivel(): Observable<Nivel[]> {
    return this.http.get<Nivel[]>(this.SERVER + 'BuscarTodos', {headers: this.headers});
  }

  public setNivel(nivel: Nivel): Observable<Nivel> {
    return this.http.post<Nivel>(this.SERVER + 'Crear', nivel, {headers: this.headers});
  }

  public removeNivel(id: number) {
    return this.http.delete<Nivel>(this.SERVER + 'Borrar?p_nivel_oid=' + id, {headers: this.headers});
  }

  public getNivelById(id) {
    return this.http.get<Nivel>(this.SERVER + id, {headers: this.headers});
  }

  public updateNivel(nivel: Nivel) {
    return this.http.put<Nivel>(this.SERVER + 'Modificar?idNivel=' + nivel.Id, nivel, {headers: this.headers});
  }

  public getNivelByItem(id): Observable<Nivel> {
    return this.http.get<Nivel>(this.SERVER + 'NivelItem?idItem=' + id, {headers: this.headers});
  }

  public assignItem(idNivel, items: number[]) {
    return this.http.put('http://localhost:16209/api/AccionReciclar/294912/ItemAccion/' + items[0] + '/NivelItem/AsignarItems?p_nivel_oid=' + idNivel, items, {headers: this.headers});
  }

  public desassignarItems(idNivel, items: number[]) {
    return this.http.put('http://localhost:16209/api/AccionReciclar/294912/ItemAccion/' + items[0] + '/NivelItem/DesasignarItems?p_nivel_oid=' + idNivel, items, {headers: this.headers});
  }

  load() {
    console.log('load');
    this.itemService.getItems().subscribe(items => {
      items.forEach(item => {
        this.getNivelByItem(item.Id).subscribe(nivel => {
          this.itemNivel.push({'item': item, 'nivel': nivel});
        });
      });
    });
    return this.itemNivel;
  }

  public countNivel(): Observable<number> {
    return this.http.get<number>(this.SERVER + 'BuscarNivelCount');
  }
 
}
