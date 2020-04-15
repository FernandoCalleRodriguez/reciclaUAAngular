import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Nota} from '../models/nota';
import {Observable, of, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotaService {
  server = 'http://localhost:16209/api/';
  private token = localStorage.getItem('ACCESS_TOKEN');
  private headers: HttpHeaders = new HttpHeaders({Authorization: this.token});

  constructor(private http: HttpClient) {
  }

  public obtenerNotaPorId(id) {
    return this.http.get<Nota>(this.server + 'NotaInformativa/' + id).pipe(map((res: Nota) => {
      return res;
    }));
  }

  public obtenerTodasNotas() {
    return this.http.get<Nota[]>(this.server + 'NotaInformativa/BuscarTodos').pipe(map(res => {
      return res;
    }));
  }

  public crear(idAdmin, titulo, cuerpo): Observable<any> {
    const nota: Nota = {UsuarioAdministrador_oid: idAdmin, Titulo: titulo, Cuerpo: cuerpo};

    return this.http.post<any>(this.server + 'NotaInformativa/Crear', nota)
      .pipe
          (map(res => {
          return res;
    }));
  }

  public borrar(nota: Nota): Observable<void> {
    return this.http.delete<void>(this.server + 'NotaInformativa/Borrar?p_notainformativa_oid=' + nota.Id);
  }


  public modificar(nota: Nota): Observable<any> {
    console.log(nota);
    return this.http.put<Nota>(this.server + 'NotaInformativa/Modificar?idNotaInformativa=' + nota.Id, nota);
  }

}


