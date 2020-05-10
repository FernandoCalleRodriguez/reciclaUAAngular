import {Observable} from 'rxjs';

import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Item} from '../models/Item';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  SERVER = 'http://localhost:16209/api/Item/';

  private TOKEN = localStorage.getItem('ACCESS_TOKEN');
  private headers: HttpHeaders = new HttpHeaders({Authorization: this.TOKEN});
  constructor(private http: HttpClient) {
  }


  public getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.SERVER + 'BuscarTodos',{headers: this.headers});
  }

  public setItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.SERVER + 'Crear', item,{headers: this.headers});
  }

  public getById(id: number): Observable<Item> {
    return this.http.get<Item>(this.SERVER + id,{headers: this.headers});
  }

  public getByUserId(id: number): Observable<Item[]> {
    return this.http.get<Item[]>(this.SERVER + 'BuscarItemsPorUsuario?id_usuario=' + id,{headers: this.headers});
  }

  public removeItem(id: number) {
    return this.http.delete<Item>(this.SERVER + 'Borrar?p_Item_oid=' + id,{headers: this.headers});
  }

  public updateItem(item: Item) {
    return this.http.put<Item>(this.SERVER + 'Modificar?idItem=' + item.Id, item,{headers: this.headers});
  }

  public uploadImage(image, id) {
    return this.http.post(this.SERVER + 'UploadImage?p_oid=' + id, image,{headers: this.headers});
  }

  public GetImage(id, imageName) {
    return this.http.get(this.SERVER + 'GetImage?id=' + id + '&imageName=' + imageName,{headers: this.headers});
  }

  public RemoveImage(id, imageName) {
    return this.http.post(this.SERVER + 'RemoveImage?id=' + id + '&imageName=' + imageName, null,{headers: this.headers});
  }

  public BuscarItemsPorNivel(id): Observable<Item[]> {
    return this.http.get<Item[]>(this.SERVER + 'BuscarItemsPorNivel?id_nivel=' + id,{headers: this.headers});
  }
  public ItemCount(): Observable<number> {
    return this.http.get<number>(this.SERVER + "ItemCount", { headers: this.headers })
  }
}
