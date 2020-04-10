import {Injectable} from '@angular/core';
import {Usuario} from '../models/usuario';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {UsuarioService} from './usuario.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  SERVER = 'http://localhost:16209/api/';
  private token: string;
  private id;
  usuario: Usuario;

  constructor(private http: HttpClient,
              private router: Router) {
  }

  Login(usuario: Usuario) {
    return this.http.post<any>(this.SERVER + 'UsuarioAdminNoAutenticado/Login', usuario).pipe(map(
      res => {
        this.saveToken(res);
        return res;
      }));
  }

  Logout(): void {
    localStorage.removeItem('ACESS_TOKEN');
    localStorage.removeItem('ID_USER');
    this.router.navigate(['']);


  }

  private saveToken(token: string): void {
    localStorage.setItem('ACESS_TOKEN', token);
    localStorage.setItem('ID_USER', this.parseJwt(token).id);

  }

  private parseJwt(token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }

  getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('ACESS_TOKEN');
    }
    return this.token;

  }

  getID(): string {
    if (!this.id) {
      this.id = localStorage.getItem('ID_USER');
    }
    return this.id;

  }

  estaAutenticado() {

    if (this.getToken() != null || this.getID() != null) {
      if (this.getID() != this.parseJwt(this.getToken()).id) {
        this.router.navigate(['']);

      }
    } else {
      this.router.navigate(['']);
    }


  }

  noEstaAutenticado() {

    if (this.getToken() != null && this.getID() != null) {
        this.router.navigate(['/home']);
    }

  }

  generarContrasena(): string {
    const caracteres = 'abcdefghijkmnpqrtuvwxyzABCDEFGHIJKLMNPQRTUVWXYZ2346789';
    let contraseña = '';
    for (let i = 0; i < 12; i++) {
      contraseña += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return contraseña;
  }

}
