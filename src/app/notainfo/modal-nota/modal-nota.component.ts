import {Component, Input, OnInit} from '@angular/core';
import {Usuario} from '../../shared/models/usuario';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {UsuarioService} from '../../shared/services/usuario.service';
import {Nota} from '../../shared/models/nota';
import {Observable} from 'rxjs';
import {NotaService} from '../../shared/services/nota.service';

@Component({
  selector: 'app-modal-nota',
  templateUrl: './modal-nota.component.html',
  styleUrls: ['./modal-nota.component.css']
})
export class ModalNotaComponent implements OnInit {
  public formulario: FormGroup;
  public user: Usuario = new Usuario();
  public nota: Nota = null;
  public edit = false;

  @Input('dudaId')
  public dId: number;
  @Input()
  public respuestaId: number;

  constructor(protected notaService: NotaService, protected usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.formulario = new FormGroup({
      titulo: new FormControl(null, [Validators.required]),
      cuerpo: new FormControl(null, [Validators.required]),
    });
  }

  public titulo(): AbstractControl {
    return this.formulario.get('titulo');
  }

  public cuerpo(): AbstractControl {
    return this.formulario.get('cuerpo');
  }

  onSubmit(): Observable<Nota> {

    return this.notaService.crear(this.nota);
  }

}
