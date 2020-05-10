import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Usuario} from '../models/usuario';
import {AutenticacionService} from './autenticacion.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable()
export class UsuarioService {
  SERVER = 'http://localhost:16209/api/';

  constructor(private http: HttpClient,
              private autenticacionService: AutenticacionService) {
  }

  CrearUsuario(usuario: Usuario, tipo: string): Observable<Usuario> {
    let url;

    if (tipo === 'web') {
      url = 'UsuarioWeb/Crear';
    } else if (tipo === 'administrador') {
      url = 'UsuarioAdminAutenticado/Crear';
    } else {
      console.log('Crear usuario error tipo usuario no valido');
    }
    return this.http.post<Usuario>(this.SERVER + url, usuario, this.getHeaderToken());

  }

  obtenerUsuarios(tipo: string): Observable<Usuario[]> {
    let url;

    if (tipo === 'web') {
      url = 'UsuarioWeb/BuscarTodos';
    } else if (tipo === 'administrador') {
      url = 'UsuarioAdminAutenticado/BuscarTodos';
    }

    return this.http.get<Usuario[]>(this.SERVER + url, this.getHeaderToken());
  }

  obtenerUsuarioPorId(id, tipo: string): Observable<Usuario> {
    let url;

    if (tipo === 'web') {
      url = 'UsuarioWeb/';
    } else if (tipo === 'administrador') {
      url = 'UsuarioAdminAutenticado/';
    }

    return this.http.get<Usuario>(this.SERVER + url + id, this.getHeaderToken());
  }

  obtenerUsuarioPorEmail(email): Observable<Usuario> {
    return this.http.get<Usuario>(this.SERVER + 'UsuarioAdminNoAutenticado/BuscarPorCorreo?p_correo=' + email);
  }

  modificarUsuario(usuario: Usuario, tipo: string): Observable<Usuario> {
    let url;

    if (tipo === 'web') {
      url = 'UsuarioWeb/Modificar?idUsuarioWeb=';
    } else if (tipo === 'administrador') {
      url = 'UsuarioAdminAutenticado/Modificar?idUsuarioAdminAutenticado=';
    }
    return this.http.put<Usuario>(this.SERVER + url + usuario.Id, usuario, this.getHeaderToken());
  }

  borrarUsuario(id, tipo: string): Observable<void> {
    let url;

    if (tipo === 'web') {
      url = 'UsuarioWeb/Borrar/?p_usuarioweb_oid=';
    } else if (tipo === 'administrador') {
      url = 'UsuarioAdminAutenticado/Borrar?p_usuarioadministrador_oid=';
    }
    return this.http.delete<void>(this.SERVER + url + id, this.getHeaderToken());
  }

  obtenerRanking(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.SERVER + 'UsuarioWeb/ObtenerRanking', this.getHeaderToken());
  }

  public countUsuariosWeb(): Observable<number> {
    return this.http.get<number>(this.SERVER + 'UsuarioWeb/BuscarTodosCount', this.getHeaderToken());
  }

  verificarEmail(id): Observable<void> {
    return this.http.post<void>(this.SERVER + 'UsuarioWebVerificarCuenta/VerificarEmail?p_usuarioweb_oid=' + id, this.getHeaderToken());
  }

  recuperarPass(usuario: Usuario): Observable<void> {
    // tslint:disable-next-line:max-line-length
    return this.http.put<void>(this.SERVER + 'UsuarioAdminRecuperarPass/CambiarPassword?idUsuarioAdminRecuperarPass=' + usuario.Id, usuario);

  }

  cambiarPass(usuario: Usuario): Observable<Usuario> {
    // tslint:disable-next-line:max-line-length
    return this.http.put<Usuario>(this.SERVER + 'UsuarioAdminAutenticado/CambiarPassword?idUsuarioAdminAutenticado=' + usuario.Id, usuario, this.getHeaderToken());
  }

  private getHeaderToken() {

    const header = {
      Authorization: this.autenticacionService.getToken(),
    };

    const requestOptions = {
      headers: new HttpHeaders(header),
    };
    return requestOptions;
  }

  public getLoggedUser(): Observable<Usuario> {
    if (this.autenticacionService.isLogged()) {
      return this.obtenerUsuarioPorId(this.autenticacionService.getID(), 'administrador');
    }
    return null;
  }
}
