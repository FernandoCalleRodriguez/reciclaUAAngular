import {Injectable} from '@angular/core';
import {Usuario} from '../models/usuario';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {BnNgIdleService} from 'bn-ng-idle';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  SERVER = 'http://localhost:16209/api/';
  private token: string;
  private id;
  usuario: Usuario;

  constructor(private http: HttpClient,
              private router: Router,
              private bnIdle: BnNgIdleService) {

  }

  Login(usuario: Usuario) {
    return this.http.post<any>(this.SERVER + 'UsuarioAdminNoAutenticado/Login', usuario).pipe(map(
      res => {
        this.saveToken(res);
        this.controlSesion();
        return res;
      }));
  }

  Logout(): void {
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('ID_USER');
    localStorage.clear();
    this.router.navigate(['login/si']);


  }

  private saveToken(token: string): void {
    localStorage.setItem('ACCESS_TOKEN', token);
    localStorage.setItem('ID_USER', this.parseJwt(token).id);
  }

  private parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }

  getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('ACCESS_TOKEN');
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
        this.router.navigate(['/login']);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  noEstaAutenticado() {
    if (this.getToken() != null && this.getID() != null) {
      if (this.getID() == this.parseJwt(this.getToken()).id) {
        this.router.navigate(['/home']);
      }
    } else {
      console.log('me quedo');
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

  controlSesion() {
    this.bnIdle.startWatching(600).subscribe((res) => {
      if (res) {
        this.Logout();
      }
    });

  }


}
