import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UsuarioService} from '../../services/usuario.service';
import {Router} from '@angular/router';
import {Usuario} from '../../models/Usuario';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  @ViewChild('frmRegistro', {static: false}) singupForm: NgForm;
  private user: Usuario;

  constructor(private userService: UsuarioService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  onRegister() {
    this.user = {
      Id: -1,
      Nombre: this.singupForm.value.name,
      Apellidos: this.singupForm.value.surname,
      Email: this.singupForm.value.email,
      Pass: this.singupForm.value.contrasena,
    };

    this.userService.Registro(this.user).subscribe(
      data => {
        this.user.Id = data;
        console.log(this.user)
        this.router.navigate(['']);
      }, error => {
        console.log('Registro fallido', error);
      }
    );
  }

}
