import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Usuario} from '../models/usuario';
import {AutenticacionService} from './autenticacion.service';
import {map} from 'rxjs/operators';

@Injectable()
export class UsuarioService {
  SERVER = 'http://localhost:16209/api/';

  constructor(private http: HttpClient,
              private autenticacionService: AutenticacionService) {
  }

  CrearUsuario(usuario: Usuario, tipo: string) {
    let url;

    if (tipo === 'web') {
      url = 'UsuarioWeb/Crear';
    } else if (tipo === 'administrador') {
      url = 'UsuarioAdminAutenticado/Crear';
    } else {
      console.log('Crear usuario error tipo usuario no valido');
    }
    return this.http.post<Usuario>(this.SERVER + url, usuario, this.getHeaderToken()).pipe(map(res => {
      return res;
    }, error1 => {
      console.log('Crear usuario fallida' + error1);
    }));

  }

  obtenerUsuarios(tipo: string) {
    let url;

    if (tipo === 'web') {
      url = 'UsuarioWeb/BuscarNoBorrados';
    } else if (tipo === 'administrador') {
      url = 'UsuarioAdminAutenticado/BuscarNoBorrados';
    } else {
    }

    return this.http.get<Usuario[]>(this.SERVER + url, this.getHeaderToken()).pipe(res => {
      return res;
    });
  }

  obtenerUsuarioPorId(id, tipo: string) {
    let url;

    if (tipo === 'web') {
      url = 'UsuarioWeb/';
    } else if (tipo === 'administrador') {
      url = 'UsuarioAdminAutenticado/';
    } else {
    }

    return this.http.get<Usuario>(this.SERVER + url + id, this.getHeaderToken()).pipe(res => {
      return res;
    });
  }

  obtenerUsuarioPorEmail(email) {

    return this.http.get<Usuario>(this.SERVER + 'UsuarioAdminNoAutenticado/BuscarPorCorreo?p_correo=' + email).pipe(res => {
      return res;
    });
  }

  modificarUsuario(usuario: Usuario, tipo: string) {
    let url;

    if (tipo === 'web') {
      url = 'UsuarioWeb/Modificar?idUsuarioWeb=';
    } else if (tipo === 'administrador') {
      url = 'UsuarioAdminAutenticado/Modificar?idUsuarioAdminAutenticado=';
    } else {
    }

    return this.http.put<any>(this.SERVER + url + usuario.Id, usuario, this.getHeaderToken()).pipe(res => {
      return res;
    });
  }

  borrarUsuario(id, tipo: string) {
    let url;

    if (tipo === 'web') {
      url = 'UsuarioWeb/Borrar/?p_usuarioweb_oid=';
    } else if (tipo === 'administrador') {
      url = 'UsuarioAdminAutenticado/Borrar?p_usuarioadministrador_oid=';
    } else {
    }
    return this.http.delete<any>(this.SERVER + url + id, this.getHeaderToken()).pipe(res => {
      return res;
    });
  }

  obtenerRanking() {
    return this.http.get<Usuario[]>(this.SERVER + 'UsuarioWeb/ObtenerRanking', this.getHeaderToken()).pipe(res => {
      return res;
    });
  }

  obtenerPuntuaciones() {

    return this.http.get<Usuario>(this.SERVER + 'UsuarioWeb/ObtenerPuntuaciones', this.getHeaderToken()).pipe(res => {
      return res;
    });
  }

  verificarEmail(id) {

    return this.http.post<any>(this.SERVER + 'UsuarioWeb/VerificarEmail?p_usuarioweb_oid=' + id, this.getHeaderToken()).pipe(res => {
      return res;
    });
  }

  recuperarPass(usuario: Usuario) {

    return this.http.put<any>(this.SERVER + 'UsuarioAdminRecuperarPass/CambiarPassword?idUsuarioAdminRecuperarPass=' + usuario.Id, usuario).pipe(map(res => {
      return res;
    }, error1 => {
      console.log('Crear usuario fallida' + error1);
    }));

  }

  cambiarPass(usuario: Usuario) {

    return this.http.put<Usuario>(this.SERVER + 'UsuarioAdminAutenticado/CambiarPassword?idUsuarioAdminAutenticado=' + usuario.Id, usuario, this.getHeaderToken()).pipe(map(res => {
      return res;
    }, error1 => {
      console.log('Cambiar contraseña fallida' + error1);
    }));
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
}
