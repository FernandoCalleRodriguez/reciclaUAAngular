import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Usuario} from '../../../shared/models/Usuario';
import {UsuarioService} from '../../../shared/services/usuario.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('frmLogin', {static: false}) singupForm: NgForm;
  user: Usuario;
  private postData;

  constructor(private userService: UsuarioService,
              private router: Router) {
  }

  ngOnInit(): void {

  }

  onLogin() {

    this.user = {
      Id: -1,
      Email: this.singupForm.value.email,
      Pass: this.singupForm.value.contrasena,
      Nombre: '',
      Apellidos: '',
    };

    this.userService.Login(this.user).subscribe(
      data => {
        this.router.navigate(['home']);
      }, error => {
        console.log('Autenticación fallida', error);
      }
    );
  }

  /*onSubmit() {
    console.log(this.singupForm);
    this.postData = {
      DNI: this.singupForm.value.email,
      Pass: this.singupForm.value.contrasena,
    };
    console.log(this.postData);
    this.userService.Login(this.postData);
  }*/

  /*getAllUsers() {
    this.usuarios = this.userService.getAllUsers().subscribe((res: any) => {
    });
  }*/
}
