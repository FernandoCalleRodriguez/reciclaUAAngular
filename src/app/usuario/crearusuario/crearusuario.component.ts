import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UsuarioService} from '../../shared/services/usuario.service';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {Usuario} from '../../shared/models/usuario';
import {ToastrService} from 'ngx-toastr';
import {Observable} from 'rxjs';
import {AutenticacionService} from '../../shared/services/autenticacion.service';

@Component({
  selector: 'app-crearusuario',
  templateUrl: './crearusuario.component.html',
  styleUrls: ['./crearusuario.component.css']
})
export class CrearusuarioComponent implements OnInit {

  tipousuario: string;
  usuario: Usuario;
  error = false;
  formularioCrear: FormGroup;

  constructor(protected route: ActivatedRoute,
              private usuarioService: UsuarioService,
              private router: Router,
              private toaster: ToastrService,
              private  autenticacionService: AutenticacionService) {
    this.autenticacionService.estaAutenticado();
  }

  ngOnInit(): void {
    this.route.params.subscribe(param => {

      this.tipousuario = param['tipousuario'];
    });

    this.formularioCrear = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      pwd: new FormControl(null, [Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&-_])[A-Za-z\\d$@$!%*?&-_].{7,}$')]),
      pwd2: new FormControl(null, [Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&-_])[A-Za-z\\d$@$!%*?&-_].{7,}$')]),
      name: new FormControl(null, [Validators.required]),
      surname: new FormControl(null, [Validators.required]),
    });
  }

  onRegister() {

    this.usuario = {
      Email: this.formularioCrear.value.email,
      Pass: this.formularioCrear.value.pwd,
      Nombre: this.formularioCrear.value.name,
      Apellidos: this.formularioCrear.value.surname,
    };
    this.usuarioService.obtenerUsuarioPorEmail(this.usuario.Email).subscribe(result => {
      if (!result) {
        this.usuarioService.CrearUsuario(this.usuario, this.tipousuario).subscribe(
          data => {
            if (data === null) {
              this.error = true;
              this.toaster.error(' El Usuario no se ha podido crear vuelva a probar más tarde');

            } else {
              this.toaster.success(' El Usuario se ha creado con éxito');
              this.router.navigate(['/usuario/' + this.tipousuario + '/listar']);

            }

          }, error => {
            this.toaster.error(' El Usuario no se ha podido crear vuelva a probar más tarde');

          }
        );
      } else {
        this.toaster.error(' El Correo electrónico utilizado ya existe');
      }
    });
  }
}
