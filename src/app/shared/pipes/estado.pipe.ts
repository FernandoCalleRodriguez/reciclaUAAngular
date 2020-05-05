import {Pipe, PipeTransform} from '@angular/core';
import {PlantaService} from '../services/planta.service';
import {ValidacionService} from '../services/validacion.service';

@Pipe({
  name: 'estado'
})
export class EstadoPipe implements PipeTransform {

  constructor(protected validacionService: ValidacionService) {
  }

  transform(id: number): string {
    return this.validacionService.getEstadoById(id).Estado;
  }

}
