import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Usuario} from '../../models/Usuario';
import {UsuarioService} from '../../services/usuario.service';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('frmLogin', {static: false}) singupForm: NgForm;
  user: Usuario;
  users: Usuario[];
  private postData;

  constructor(private userService: UsuarioService,
              private router: Router) {
  }

  ngOnInit(): void {

  }

  onLogin() {
    this.postData = {
      Email: this.singupForm.value.email,
      Pass: this.singupForm.value.contrasena,
    };
    this.userService.Login(this.postData).subscribe(
      data => {
        this.router.navigate(['home']);
      }, error => {
        console.log('Autenticación fallida');
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
