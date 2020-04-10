import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Duda} from '../models/duda';
import {Observable} from 'rxjs';

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
}
