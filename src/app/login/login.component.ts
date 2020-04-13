import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Usuario} from '../shared/models/usuario';
import {UsuarioService} from '../shared/services/usuario.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AutenticacionService} from '../shared/services/autenticacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('frmLogin', {static: false}) singupForm: NgForm;
  user: Usuario;
  private postData;
  cerrarsesion;

  constructor(private autenticacionService: AutenticacionService,
              private router: Router,
              private route: ActivatedRoute) {

    this.route.params.subscribe(param => {

      this.cerrarsesion = param['cerrarsesion'];

      console.log(this.cerrarsesion);
      if (this.cerrarsesion === '' || this.cerrarsesion === undefined) {
        this.autenticacionService.noEstaAutenticado();

      }

    });
  }

  ngOnInit(): void {
  }

  onLogin() {

    this.user = {
      Email: this.singupForm.value.email,
      Pass: this.singupForm.value.contrasena,
      Nombre: '',
      Apellidos: '',
    };

    this.autenticacionService.Login(this.user).subscribe(
      data => {
        this.router.navigate(['/home']);
      }, error => {
        console.log('Autenticación fallida', error);
      }
    );
  }

}
