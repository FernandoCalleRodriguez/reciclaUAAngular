import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../models/Item';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  SERVER = 'http://localhost:16209/api/Item/';
  constructor(private http: HttpClient) { }


  public getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.SERVER + "BuscarTodos")
  }
  public setItem(item: Item) :Observable<Item>{
    console.log("lol",JSON.stringify(item))
    return this.http.post<Item>(this.SERVER + "Crear", item)
  }

  public getById(id:number):Observable<Item>{
    return this.http.get<Item>(this.SERVER + id)
  }
  public getByUserId(id:number):Observable<Item[]>{
    return this.http.get<Item[]>(this.SERVER +"BuscarItemsPorUsuario?id_usuario="+ id)
  }
  public removeItem(id: number) {
    return this.http.delete<Item>(this.SERVER + "Borrar?p_Item_oid=" + id);
  }
  
  public updateItem(item: Item) {
    return this.http.put<Item>(this.SERVER + "Modificar?idItem=" + item.Id, item);
  }

  public uploadImage(image,id){
    return this.http.post(this.SERVER +"UploadImage?p_oid="+id,image)
  }

  public GetImage(id,imageName){
    return this.http.get(this.SERVER +"GetImage?id="+id+"&imageName="+imageName)
  }
  public RemoveImage(id,imageName){
    return this.http.post(this.SERVER+"RemoveImage?id="+id+"&imageName="+imageName,null)
  }
}
