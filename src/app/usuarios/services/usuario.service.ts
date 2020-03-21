import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Usuario} from '../models/Usuario';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class UsuarioService {
  private currentUserSubject: BehaviorSubject<string>;
  SERVER = 'http://localhost:16209/api/';
  private token: string;

  constructor(private http: HttpClient) {
  }

  getAllUsers() {
    return this.http.get(this.SERVER + 'Usuario/ReadAll');
  }

  Login(usuario) {
    return this.http.post<any>(this.SERVER + 'Usuario/Login', usuario).pipe(map(res => {
      this.saveToken(res);
      return res;
    }));
  }

  Logout(): void {
    this.token = '';
    localStorage.removeItem('ACESS_TOKEN');

  }

  Registro(usuario) {
    console.log(usuario);
    return this.http.post<any>(this.SERVER + '/Usuario/Crear', usuario).pipe(map(res => {
      console.log(res);
      this.saveToken(res);
      return res;
    }));

  }

  private saveToken(token: string): void {
    localStorage.setItem('ACESS_TOKEN', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('ACESS_TOKEN');
    }
    return this.token;

  }

  public damePuntos() {
    const header = {
      Authorization: this.getToken(),
    };

    const requestOptions = {
      headers: new HttpHeaders(header),
    };
    console.log(requestOptions);

    return this.http.get(this.SERVER + '/PuntoReciclaje/DameMisPuntos?idUsuarioWeb=32769', requestOptions).pipe(map(res => {
      console.log(res);
      return res;
    }));
  }

  getProductById(id) {
    return this.http.get(this.SERVER + '');
  }
}
