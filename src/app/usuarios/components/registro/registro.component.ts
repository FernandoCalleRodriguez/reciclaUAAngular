import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UsuarioService} from '../../services/usuario.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  @ViewChild('frmRegistro', {static: false}) singupForm: NgForm;

  private postData;

  constructor(private userService: UsuarioService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  onRegister() {
    this.postData = {
      Nombre: this.singupForm.value.name,
      Apellidos: this.singupForm.value.surname,
      Email: this.singupForm.value.email,
      Pass: this.singupForm.value.contrasena,
      Fecha: '2020-03-20T16:49:15.108Z',
      Estado: false,
      EmailVerificado: false,
    };
    this.userService.Registro(this.postData).subscribe(
      data => {
        this.router.navigate(['home']);
      }, error => {
        console.log('Autenticación fallida');
      }
    );
  }

}
