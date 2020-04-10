import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Usuario} from '../../shared/models/usuario';
import {UsuarioService} from '../../shared/services/usuario.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-usuariolistar',
  templateUrl: './usuariolistar.component.html',
  styleUrls: ['./usuariolistar.component.css']
})
export class UsuariolistarComponent implements OnInit {
  @ViewChild('frmSearch', {static: false}) searchForm: NgForm;

  tipousuario: string; // web o admin
  usuarios: Usuario[];


  constructor(protected route: ActivatedRoute,
              private usuarioService: UsuarioService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(param => {

      this.tipousuario = param['tipousuario'];

      this.usuarioService.obtenerUsuarios(this.tipousuario).subscribe(usuarios => {
        this.usuarios = usuarios;
        console.log(usuarios);
      });
    });


  }

  onSearch() {
    console.log("entro");
    this.usuarioService.obtenerUsuarioPorId(this.searchForm.value.id, this.tipousuario).subscribe(usuario => {
      this.usuarios.splice(0);
      this.usuarios.push(usuario);
      console.log(this.usuarios);
    });
  }

  borrarUsuario(id) {
    this.usuarioService.borrarUsuario(id, this.tipousuario).subscribe(res => {
      this.router.navigate(['/listarusuario/' + this.tipousuario]);
    });
  }

  modificarUsuario(id) {
    this.router.navigate(['/modificarusuario/' + this.tipousuario + '/' + id]);
  }

}
