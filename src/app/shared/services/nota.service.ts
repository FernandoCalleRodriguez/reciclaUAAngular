import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Nota} from '../models/nota';
import {Observable, of, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotaService {
  server = 'https://reciclaua-admin.azurewebsites.net/api/';
  private token = localStorage.getItem('ACCESS_TOKEN');
  private headers: HttpHeaders = new HttpHeaders({Authorization: this.token});

  constructor(private http: HttpClient) {
  }

  public obtenerNotaPorId(id) {
    return this.http.get<Nota>(this.server + 'NotaInformativa/' + id, {headers: this.headers});
  }

  public obtenerTodasNotas() {
    return this.http.get<Nota[]>(this.server + 'NotaInformativa/BuscarTodos', {headers: this.headers});
  }

  public crear(nota: Nota): Observable<any> {
    return this.http.post<any>(this.server + 'NotaInformativa/Crear', nota, {headers: this.headers});
  }

  public borrar(nota: Nota): Observable<void> {
    return this.http.delete<void>(this.server + 'NotaInformativa/Borrar?p_notainformativa_oid=' + nota.Id, {headers: this.headers});
  }


  public modificar(nota: Nota): Observable<any> {
    // console.log(nota);
    return this.http.put<Nota>(this.server + 'NotaInformativa/Modificar?idNotaInformativa=' + nota.Id, nota, {headers: this.headers});
  }

}


