import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Material } from '../models/Material';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  SERVER = 'http://localhost:16209/api/Material/';
  constructor(private http: HttpClient) { }


  public getMaterial(): Observable<Material[]> {
    return this.http.get<Material[]>(this.SERVER + "BuscarTodos")
  }
  public setMaterial(Material: Material): Observable<Material> {
    return this.http.post<Material>(this.SERVER + "Crear", Material);
  }
  public removeMaterial(id: number) {
    return this.http.delete<Material>(this.SERVER + "Borrar?p_Material_oid=" + id);
  }
  public getMaterialById(id) {
    return this.http.get<Material>(this.SERVER + id);
  }
  
  public updateMaterial(Material: Material) {
    return this.http.put<Material>(this.SERVER + "Modificar?idMaterial=" + Material.Id, Material);
  }

  public BuscarMaterialesPorValidar(): Observable<Material[]> {
    return this.http.get<Material[]>(this.SERVER + "BuscarMaterialesPorValidar")
  }
  public BuscarMaterialesValidados(): Observable<Material[]> {
    return this.http.get<Material[]>(this.SERVER + "BuscarMaterialesValidados")
  }
  public BuscarPorTipoContenedor(id): Observable<Material[]> {
    return this.http.get<Material[]>(this.SERVER + "BuscarPorTipoContenedor?p_tipocontenedor="+id)
  }
  public BuscarMaterialesPorUsuario(id): Observable<Material[]> {
    return this.http.get<Material[]>(this.SERVER + "BuscarMaterialesPorUsuario?id_usuario="+id)
  }

}
