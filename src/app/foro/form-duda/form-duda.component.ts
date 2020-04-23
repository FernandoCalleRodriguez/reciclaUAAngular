import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {TemaService} from '../../shared/services/tema.service';
import {DudaService} from '../../shared/services/duda.service';
import {Tema} from '../../shared/models/tema';
import {Duda} from '../../shared/models/duda';
import {ActivatedRoute, Router} from '@angular/router';
import {Usuario} from '../../shared/models/usuario';
import {UsuarioService} from '../../shared/services/usuario.service';
import {AutenticacionService} from '../../shared/services/autenticacion.service';

@Component({
  selector: 'app-form-duda',
  templateUrl: './form-duda.component.html',
  styleUrls: ['./form-duda.component.css']
})
export class FormDudaComponent implements OnInit {
  public formulario: FormGroup;
  public temas: Tema[] = null;
  public user: Usuario = new Usuario();
  public duda: Duda = new Duda();
  public edit = false;

  constructor(protected temaService: TemaService, protected dudaService: DudaService, protected autenticacionService: AutenticacionService,
              protected router: Router, protected usuarioService: UsuarioService, protected route: ActivatedRoute) {
    autenticacionService.estaAutenticado();
    this.temas = temaService.getTemas();
    this.usuarioService.getLoggedUser().subscribe(u => {
      this.user = u;
    });
    this.route.params.subscribe(params => {
      if (params.dudaId) {
        this.edit = true;
        dudaService.getDudaById(params.dudaId).subscribe(d => {
          this.duda = d;
          this.titulo().setValue(d.Titulo);
          this.cuerpo().setValue(d.Cuerpo);
          this.tema().setValue(d.Tema);
        });
      }
    });
  }

  ngOnInit(): void {
    this.formulario = new FormGroup({
      titulo: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      cuerpo: new FormControl(null, [Validators.required]),
      tema: new FormControl(1, [Validators.required])
    });
  }

  public titulo(): AbstractControl {
    return this.formulario.get('titulo');
  }

  public cuerpo(): AbstractControl {
    return this.formulario.get('cuerpo');
  }

  public tema(): AbstractControl {
    return this.formulario.get('tema');
  }

  onSubmit() {
    if (this.formulario.valid && this.user.Id) {
      this.duda.Titulo = this.formulario.get('titulo').value;
      this.duda.Cuerpo = this.formulario.get('cuerpo').value;
      this.duda.Tema = this.formulario.get('tema').value;

      if (this.edit) {
        this.dudaService.modificar(this.duda).subscribe(d => {
          this.router.navigate(['/foro/duda/listar']);
        });
      } else {
        this.duda.Usuario_oid = this.user.Id;
        this.dudaService.crear(this.duda).subscribe(id => {
          this.router.navigate(['/foro/duda/listar']);
        });
      }
    }
  }
}
