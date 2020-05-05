import {Pipe, PipeTransform} from '@angular/core';
import {PlantaService} from '../services/planta.service';

@Pipe({
  name: 'planta'
})
export class PlantaPipe implements PipeTransform {

  constructor(protected plantaService: PlantaService) {
  }

  transform(id: number): string {
    return this.plantaService.getTipoPlantaById(id).Planta;
  }

}
