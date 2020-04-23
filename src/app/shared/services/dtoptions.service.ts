import {Injectable} from '@angular/core';
import {SweetAlertOptions} from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class DtoptionsService {
  dtOptions: DataTables.Settings = {};

  constructor() {
  }

  getDtoptions(nombre) {

    return this.dtOptions = {
      language: {
        decimal: '',
        emptyTable: 'No hay ' + nombre + ' disponibles en la tabla',
        info: 'Mostrando _START_ hasta _END_ de _TOTAL_ ' + nombre + ' en total',
        infoEmpty: 'Mostrando 0 hasta 0 de 0 ' + nombre,
        infoFiltered: '(filtrado de _MAX_ items en total)',
        infoPostFix: '',
        thousands: ',',
        lengthMenu: 'Mostar _MENU_ ' + nombre + ' por página',
        loadingRecords: 'Cargando...',
        processing: 'Procesando...',
        search: 'Buscar: ',
        zeroRecords: 'No se encontraron ' + nombre,
        paginate: {
          first: 'Primero',
          last: 'Último',
          next: 'Siguiente',
          previous: 'Anterior'
        },
        aria: {
          sortAscending: ': activar ordenamiento de columnas ascendentemente',
          sortDescending: ': activar ordenamiento de columnas descendentemente'
        }
      }
    };
  }

  getSwalWarningOptions(elemento: string, id, isString: boolean = false, accion: string = 'borrar'): SweetAlertOptions {
    const printId = isString ? '"' + id + '"' : id;
    return {
      title: '¿Estás seguro de que deseas ' + accion + ' ' + elemento + ' ' + printId + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    };
  }
}
