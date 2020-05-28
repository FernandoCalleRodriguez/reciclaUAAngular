import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {Usuario} from '../shared/models/usuario';
import {UsuarioService} from '../shared/services/usuario.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AutenticacionService} from '../shared/services/autenticacion.service';
import {ToastrService} from 'ngx-toastr';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: Usuario;
  cerrarsesion;
  formularioLogin: FormGroup;

  constructor(private autenticacionService: AutenticacionService,
              private router: Router,
              private route: ActivatedRoute,
              private toaster: ToastrService,
              private titleService: Title) {

    this.autenticacionService.noEstaAutenticado();
    this.titleService.setTitle( 'Inicio de sesión' );

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
        this.toaster.error(' Las ceredenciales introducidas no son correctas');
      }
    );
  }

}
