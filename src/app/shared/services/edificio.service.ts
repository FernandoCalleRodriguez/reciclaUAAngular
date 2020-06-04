import {Edificio} from '../models/edificio';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Punto} from '../models/punto';

@Injectable({
  providedIn: 'root'
})
export class EdificioService {
  SERVER = 'http://reciclaua-admin.azurewebsites.net/api/Edificio/';
  private token = localStorage.getItem('ACCESS_TOKEN');
  private headers: HttpHeaders = new HttpHeaders({Authorization: this.token});

  constructor(private http: HttpClient) {
  }

  public getEdificio(): Observable<Edificio[]> {
    return this.http.get<Edificio[]>(this.SERVER + 'BuscarTodos', {headers: this.headers});
  }

  public setEdificio(edificio: Edificio): Observable<Edificio> {
    return this.http.post<Edificio>(this.SERVER + 'Crear', edificio, {headers: this.headers});
  }

  public removeEdificio(id: number) {
    return this.http.delete<Edificio>(this.SERVER + 'Borrar?p_edificio_oid=' + id, {headers: this.headers});
  }

  public updateEdificio(edificio: Edificio) {
    return this.http.put<Edificio>(this.SERVER + 'Modificar?idEdificio=' + edificio.Id, edificio, {headers: this.headers});
  }

  public getEdificioById(id) {
    return this.http.get<Edificio>(this.SERVER + id, {headers: this.headers});
  }

  public getEdificioByNombre(id) {
    return this.http.get<Edificio>(this.SERVER + 'EdificioNombre?idNombre=' + id, {headers: this.headers});
  }

  public getEdificioByPlanta(id: number): Observable<Edificio> {
    return this.http.get<Edificio>(this.SERVER + 'BuscarEdificioPorPlanta?planta_id=' + id);
  }
}
