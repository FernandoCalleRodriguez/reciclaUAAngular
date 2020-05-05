import {Pipe, PipeTransform} from '@angular/core';
import {PlantaService} from '../services/planta.service';
import {ValidacionService} from '../services/validacion.service';
import {TemaService} from '../services/tema.service';

@Pipe({
  name: 'tema'
})
export class TemaPipe implements PipeTransform {

  constructor(protected temaService: TemaService) {
  }

  transform(id: number): string {
    return this.temaService.getTemaById(id).Tema;
  }

}
