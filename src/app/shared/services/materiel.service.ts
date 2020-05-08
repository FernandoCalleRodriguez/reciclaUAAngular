import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Material } from '../models/Material';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  SERVER = 'http://localhost:16209/api/Material/';

  private TOKEN = localStorage.getItem('ACCESS_TOKEN');
  private headers: HttpHeaders = new HttpHeaders({ Authorization: this.TOKEN });
  constructor(private http: HttpClient) { }


  public getMaterial(): Observable<Material[]> {
    return this.http.get<Material[]>(this.SERVER + "BuscarTodos", { headers: this.headers })
  }
  public setMaterial(Material: Material): Observable<Material> {
    return this.http.post<Material>(this.SERVER + "Crear", Material, { headers: this.headers });
  }
  public removeMaterial(id: number) {
    return this.http.delete<Material>(this.SERVER + "Borrar?p_Material_oid=" + id, { headers: this.headers });
  }
  public getMaterialById(id) {
    return this.http.get<Material>(this.SERVER + id, { headers: this.headers });
  }

  public updateMaterial(Material: Material) {
    return this.http.put<Material>(this.SERVER + "Modificar?idMaterial=" + Material.Id, Material, { headers: this.headers });
  }

  public BuscarMaterialesPorValidar(): Observable<Material[]> {
    return this.http.get<Material[]>(this.SERVER + "BuscarMaterialesPorValidar", { headers: this.headers })
  }
  public BuscarMaterialesValidados(): Observable<Material[]> {
    return this.http.get<Material[]>(this.SERVER + "BuscarMaterialesValidados", { headers: this.headers })
  }
  public BuscarPorTipoContenedor(id): Observable<Material[]> {
    return this.http.get<Material[]>(this.SERVER + "BuscarPorTipoContenedor?p_tipocontenedor=" + id, { headers: this.headers })
  }
  public BuscarMaterialesPorUsuario(id): Observable<Material[]> {
    return this.http.get<Material[]>(this.SERVER + "BuscarMaterialesPorUsuario?id_usuario=" + id, { headers: this.headers })
  }
  public MaterialCount(): Observable<number> {
    return this.http.get<number>(this.SERVER + "MaterialCount", { headers: this.headers })
  }

}
