import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Duda} from '../models/duda';
import {Respuesta} from '../models/respuesta';

@Injectable({
  providedIn: 'root'
})
export class RespuestaService {
  private SERVER = 'http://localhost:16209/api/';
  private TOKEN = localStorage.getItem('ACCESS_TOKEN');
  private headers: HttpHeaders = new HttpHeaders({Authorization: this.TOKEN});

  constructor(protected http: HttpClient) {
  }

  public getAllRespuestas(): Observable<Respuesta[]> {
    return this.http.get<Respuesta[]>(this.SERVER + 'Respuesta/BuscarTodos', {headers: this.headers});
  }

  public getRespuestasByDuda(id: number): Observable<Respuesta[]> {
    return this.http.get<Respuesta[]>(this.SERVER + 'Respuesta/RespuestasDuda?idDuda=' + id, {headers: this.headers});
  }
}