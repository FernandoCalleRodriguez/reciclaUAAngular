import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Duda} from '../models/duda';
import {Observable} from 'rxjs';
import {Respuesta} from '../models/respuesta';

@Injectable({
  providedIn: 'root'
})
export class DudaService {
  private SERVER = 'http://localhost:16209/api/';
  private TOKEN = localStorage.getItem('ACCESS_TOKEN');
  private headers: HttpHeaders = new HttpHeaders({Authorization: this.TOKEN});

  constructor(protected http: HttpClient) {
  }

  public getAllDudas(): Observable<Duda[]> {
    return this.http.get<Duda[]>(this.SERVER + 'Duda/BuscarTodos', {headers: this.headers});
  }

  public getDudaById(id: number): Observable<Duda> {
    return this.http.get<Duda>(this.SERVER + 'Duda/' + id, {headers: this.headers});
  }

  public crear(duda: Duda): Observable<number> {
    return this.http.post<number>(this.SERVER + 'Duda/Crear', duda, {headers: this.headers});
  }

  public modificar(duda: Duda): Observable<Duda> {
    return this.http.put<Duda>(this.SERVER + 'Duda/Modificar?idDuda=' + duda.Id, duda, {headers: this.headers});
  }

  public getDudaByRespuesta(id: number): Observable<Duda> {
    return this.http.get<Duda>(this.SERVER + 'Duda/DudaRespuesta?idRespuesta=' + id, {headers: this.headers});
  }
}
