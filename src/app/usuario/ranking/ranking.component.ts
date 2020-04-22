import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UsuarioService} from '../../shared/services/usuario.service';
import {Usuario} from '../../shared/models/usuario';
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';
import {AutenticacionService} from '../../shared/services/autenticacion.service';
import {DtoptionsService} from '../../shared/services/dtoptions.service';

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
  dtOptions: DataTables.Settings = {};

  constructor(private usuarioService: UsuarioService,
              private autenticacionService: AutenticacionService,
              private  dtoptionsService: DtoptionsService) {
    this.autenticacionService.estaAutenticado();
    this.usuarioService.obtenerRanking().subscribe(usuarios => {
      this.usuarios = usuarios;
      this.dtTrigger.next();
    });
  }

  ngOnInit(): void {
    this.dtOptions = this.dtoptionsService.getDtoptions('usuarios');


  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
