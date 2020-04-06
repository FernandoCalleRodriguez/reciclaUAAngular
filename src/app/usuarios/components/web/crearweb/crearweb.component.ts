import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Usuario} from '../../../../shared/models/Usuario';
import {UsuarioService} from '../../../../shared/services/usuario.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-crearweb',
  templateUrl: './crearweb.component.html',
  styleUrls: ['./crearweb.component.css']
})
export class CrearwebComponent implements OnInit {

  @ViewChild('frmRegistro', {static: false}) singupForm: NgForm;
  private user: Usuario;

  constructor(private userService: UsuarioService,
              private router: Router) { }

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

    this.userService.CrearWeb(this.user).subscribe(
      data => {
        this.user.Id = data;
        console.log(this.user)
        this.router.navigate(['list-web']);
      }, error => {
        console.log('Crear usuario admin fallido', error);
      }
    );
  }
}
