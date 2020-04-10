import {Component, OnInit} from '@angular/core';
import {DudaService} from '../../shared/services/duda.service';
import {Duda} from '../../shared/models/duda';
import {Router} from '@angular/router';
import {TemaService} from '../../shared/services/tema.service';

@Component({
  selector: 'app-lista-dudas',
  templateUrl: './lista-dudas.component.html',
  styleUrls: ['./lista-dudas.component.css']
})
export class ListaDudasComponent implements OnInit {

  public dudas: Duda[] = null;
  public duda: Duda = null;

  constructor(protected dudaService: DudaService, protected  temaService: TemaService, protected router: Router) {
    dudaService.getAllDudas().subscribe(d => {
      this.dudas = d;
    }, error => {
      router.navigate(['/']);
    });
  }

  public getTema(id: number): string {
    return this.temaService.getTemaById(id).Tema;
  }

  public showDuda(duda: Duda) {
    this.duda = duda;
  }

  ngOnInit(): void {
  }

}
