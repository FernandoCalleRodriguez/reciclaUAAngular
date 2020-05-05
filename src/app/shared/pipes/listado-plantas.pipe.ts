import {Pipe, PipeTransform} from '@angular/core';
import {Planta} from '../models/planta';
import {PlantaService} from '../services/planta.service';

@Pipe({
  name: 'listadoPlantas'
})
export class ListadoPlantasPipe implements PipeTransform {

  constructor(protected plantaService: PlantaService) {
  }

  transform(plantas: Planta[]): unknown {
    if (plantas && plantas.length > 0) {
      plantas.sort((a, b) => {
        return a.Planta - b.Planta;
      });
      let r = '';
      plantas.forEach((p, i) => {
        const s = this.plantaService.getTipoPlantaById(p.Planta).Planta;
        if (p.Planta === 6) {
          r = s + ', ' + r;
        } else {
          r += s + ', ';
        }
      });
      return r.substring(0, r.length - 2);
    }
    return 'No hay plantas';
  }
}
