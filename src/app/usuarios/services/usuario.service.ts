import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Usuario} from '../models/Usuario';
import {BehaviorSubject, Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {error} from '@angular/compiler/src/util';

@Injectable()
export class UsuarioService {
  private currentUserSubject: BehaviorSubject<string>;
  SERVER = 'http://localhost:16209/api/';
  private token: string;
  private email: string;
  private id: number;

  constructor(private http: HttpClient) {
  }


  Login(usuario: Usuario) {
    return this.http.post<any>(this.SERVER + 'Usuario/Login', usuario).pipe(map(
      res => {
        this.saveToken(res, usuario.Email);
        return res;
      })
    );
  }

  Logout(): void {
    this.token = '';
    localStorage.removeItem('ACESS_TOKEN');

  }

  Registro(usuario: Usuario) {
    return this.http.post<any>(this.SERVER + 'Usuario/CrearUsuarioGeneral', usuario).pipe(map(res => {
      return res;
    }));

  }

  Update(usuario: Usuario) {
    return this.http.put<any>(this.SERVER + 'Usuario/' + usuario.Id, usuario, this.getHeaderToken()).pipe(map(res => {
      return res;
    }));
  }

  Borrado() {
    return this.http.delete<any>(this.SERVER + 'UsuarioWeb/' + this.getId() + '?p_usuario_oid=' + this.getId(), this.getHeaderToken()).pipe(map(res => {
      this.saveToken(null, null);
      return res;
    }));
  }

  private saveToken(token: string, email: string): void {
    localStorage.setItem('ACESS_TOKEN', token);
    localStorage.setItem('EMAIL', email);

    this.token = token;
    this.email = email;
  }

  private saveId(id: number): void {
    localStorage.setItem('ID', id.toString());
    this.id = id;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('ACESS_TOKEN');
    }
    return this.token;

  }

  private getEmail(): string {
    if (!this.email) {
      this.email = localStorage.getItem('EMAIL');
    }
    return this.email;

  }

  private getId(): number {
    if (!this.id) {
      this.id = parseInt(localStorage.getItem('ID'));
    }
    return this.id;

  }

  private getHeaderToken() {
    const header = {
      Authorization: this.getToken(),
    };

    const requestOptions = {
      headers: new HttpHeaders(header),
    };
    return requestOptions;
  }

  public damePuntos() {
    return this.http.get(this.SERVER + '/PuntoReciclaje/DameMisPuntos?idUsuarioWeb=32769', this.getHeaderToken()).pipe(map(res => {
      console.log(res);
      return res;
    }));
  }

  public obtenerUsusarioPorEmail() {
    console.log(this.getEmail());
    return this.http.get<Usuario>(this.SERVER + 'UsuarioWeb/BuscarPorCorreo?p_correo=' + this.getEmail(),
      this.getHeaderToken()).pipe(map((res: Usuario) => {
      console.log(res.Id);
      this.saveId(res.Id);
      return res;
    }));
  }

}
