import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UsuarioService} from '../../shared/services/usuario.service';
import {Usuario} from '../../shared/models/usuario';
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';
import {AutenticacionService} from '../../shared/services/autenticacion.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit, OnDestroy {

  usuarios: Usuario[];
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private usuarioService: UsuarioService,
              private autenticacionService: AutenticacionService) {
    this.autenticacionService.estaAutenticado();
    this.usuarioService.obtenerRanking().subscribe(usuarios => {
      this.usuarios = usuarios;
      this.dtTrigger.next();
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
