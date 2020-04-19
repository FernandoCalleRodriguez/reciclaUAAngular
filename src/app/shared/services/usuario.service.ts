import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Usuario} from '../models/usuario';
import {BehaviorSubject, Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {error} from '@angular/compiler/src/util';

@Injectable()
export class UsuarioService {
  private currentUserSubject: BehaviorSubject<string>;
  SERVER = 'http://localhost:16209/api/';
  private token: string;
  private user: Usuario;
  private email: string;
  private id: number;

  constructor(private http: HttpClient) {
  }


  Login(usuario: Usuario) {
    return this.http.post<any>(this.SERVER + 'UsuarioAdminNoAutenticado/Login', usuario).pipe(map(
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

  CrearAdmin(usuario: Usuario) {
    return this.http.post<any>(this.SERVER + 'UsuarioAdminAutenticado/Crear', usuario, this.getHeaderToken()).subscribe(res => {
      return res;
    }, error1 => {
      console.log(error1);
    });

  }

  CrearWeb(usuario: Usuario) {
    return this.http.post<any>(this.SERVER + 'UsuarioWeb/Crear', usuario, this.getHeaderToken()).pipe(map(res => {
      return res;
    }));

  }


  obtenerTodosAdmin() {
    return this.http.get<Usuario[]>(this.SERVER + 'UsuarioAdminAutenticado/BuscarTodos', this.getHeaderToken()).pipe(map(res => {
      return res;
    }));
  }

  obtenerTodosWeb() {
    return this.http.get<Usuario[]>(this.SERVER + 'UsuarioWeb/BuscarTodos', this.getHeaderToken()).pipe(map(res => {
      return res;
    }));
  }

  obtenerAdminPorId(id) {
    return this.http.get<Usuario>(this.SERVER + 'UsuarioAdminAutenticado/' + id, this.getHeaderToken()).pipe(map(res => {
      return res;
    }));
  }

  public obtenerWebPorId(id) {
    return this.http.get<Usuario>(this.SERVER + 'UsuarioWeb/' + id, this.getHeaderToken()).pipe(map((res: Usuario) => {
      return res;
    }));
  }

  modificarAdmin(usuario: Usuario) {
    return this.http.put<any>(this.SERVER + 'UsuarioAdminAutenticado/Modificar?idUsuarioAdminAutenticado=' + usuario.Id,
      usuario, this.getHeaderToken()).pipe(map(res => {
      return res;
    }));
  }

  modificarWeb(usuario: Usuario) {
    return this.http.put<any>(this.SERVER + 'UsuarioWeb/Modificar?idUsuarioWeb=' + usuario.Id,
      usuario, this.getHeaderToken()).pipe(map(res => {
      return res;
    }));
  }

  borrarAdmin(id) {
    return this.http.delete<any>(this.SERVER + 'UsuarioWeb/Borrar/?p_usuario_oid=' + id, this.getHeaderToken())
      .pipe(map(res => {
        this.saveToken(null, null);
        return res;
      }));
  }

  borrarWeb(id) {
    return this.http.delete<any>(this.SERVER + 'UsuarioWeb/Borrar?p_usuarioweb_oid=' + id, this.getHeaderToken()).pipe(map(res => {
      return res;
    }));
  }

  obtenerRanking() {
    return this.http.get<Usuario>(this.SERVER + 'UsuarioWeb/ObtenerRanking', this.getHeaderToken()).pipe(map((res: Usuario) => {
      return res;
    }));
  }

  obtenerPuntuaciones() {

    return this.http.get<Usuario>(this.SERVER + 'UsuarioWeb/ObtenerPuntuaciones', this.getHeaderToken()).pipe(map((res: Usuario) => {
      return res;
    }));
  }

  private saveToken(token: string, email: string): void {
    localStorage.setItem('ACESS_TOKEN', token);

    this.token = token;
    console.log();
    this.obtenerAdminPorId(this.parseJwt(token).id).subscribe(usuario => {
      localStorage.setItem('DATA_USER', JSON.stringify(usuario));
      localStorage.setItem('ID_USER', usuario.Id.toString());

    });
  }

  private parseJwt(token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('ACESS_TOKEN');
    }
    return this.token;
  }


  /*private getId(): number {
    if (!this.id) {
      this.id = parseInt(localStorage.getItem('ID'));
    }
    return this.id;

  }*/

  private getHeaderToken() {
    const header = {
      Authorization: this.getToken(),
    };

    const requestOptions = {
      headers: new HttpHeaders(header),
    };
    return requestOptions;
  }

  public obtenerUsuarioActual() {
    if (!this.token) {
      this.user = JSON.parse(localStorage.getItem('DATA_USER'));
    }
    return this.user.Id;
  }


}
