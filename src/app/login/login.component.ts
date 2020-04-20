import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
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
  user: Usuario;
  cerrarsesion;
  formularioLogin: FormGroup;
  error = false;

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

    this.formularioLogin = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      pwd: new FormControl(null, [Validators.required]),
    });
  }

  onLogin() {

    this.user = {
      Email: this.formularioLogin.value.email,
      Pass: this.formularioLogin.value.pwd,

    };

    this.autenticacionService.Login(this.user).subscribe(
      data => {
        this.router.navigate(['/home']);
      }, error => {
        console.log('Autenticación fallida', error);
        this.error  = true;
      }
    );
  }

}
