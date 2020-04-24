import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Tema} from '../../shared/models/tema';
import {Usuario} from '../../shared/models/usuario';
import {Duda} from '../../shared/models/duda';
import {TemaService} from '../../shared/services/tema.service';
import {DudaService} from '../../shared/services/duda.service';
import {UsuarioService} from '../../shared/services/usuario.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-form-duda-modal',
  templateUrl: './form-duda-modal.component.html',
  styleUrls: ['./form-duda-modal.component.css']
})
export class FormDudaModalComponent implements OnInit {
  public formulario: FormGroup;
  public temas: Tema[] = null;
  public user: Usuario = new Usuario();
  public duda: Duda = new Duda();
  public edit = false;
  @Input() dudaId: number;

  constructor(protected temaService: TemaService, protected dudaService: DudaService, protected usuarioService: UsuarioService) {
    this.temas = temaService.getTemas();
    this.usuarioService.getLoggedUser().subscribe(u => {
      this.user = u;
    });
  }

  ngOnInit(): void {
    this.formulario = new FormGroup({
      titulo: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      cuerpo: new FormControl(null, [Validators.required, Validators.maxLength(1500)]),
      tema: new FormControl(1, [Validators.required])
    });

    if (this.dudaId) {
      this.dudaService.getDudaById(this.dudaId).subscribe(d => {
        this.edit = true;
        this.duda = d;
        this.titulo().setValue(d.Titulo);
        this.cuerpo().setValue(d.Cuerpo);
        this.tema().setValue(d.Tema);
      });
    }
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

  public onSubmit(): Observable<Duda> {
    if (this.formulario.valid && this.user.Id) {
      this.duda.Titulo = this.formulario.get('titulo').value;
      this.duda.Cuerpo = this.formulario.get('cuerpo').value;
      this.duda.Tema = this.formulario.get('tema').value;

      if (this.edit) {
        return this.dudaService.modificar(this.duda);
      } else {
        this.duda.Usuario_oid = this.user.Id;
        return this.dudaService.crear(this.duda);
      }
    }
  }
}
