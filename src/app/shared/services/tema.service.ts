import {Injectable} from '@angular/core';
import {Tema} from '../models/tema';

@Injectable({
  providedIn: 'root'
})

export class TemaService {
  private temas: Tema[] = [
    {
      Id: 1,
      Tema: 'Consejo'
    },
    {
      Id: 2,
      Tema: 'Anécdota'
    },
    {
      Id: 3,
      Tema: 'Cuestión'
    },
  ];

  constructor() {
  }

  public getTemas(): Tema[] {
    return this.temas;
  }

  public getTemaById(id: number): Tema {
    return this.temas.find(t => t.Id === id);
  }
}
