import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UsuarioService} from './shared/services/usuario.service';
import {ToastrService} from 'ngx-toastr';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
// import {BnNgIdleService} from 'bn-ng-idle';
import {AutenticacionService} from './shared/services/autenticacion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'reciclaUA';

  constructor(/* private bnIdle: BnNgIdleService, */
              private autenticacionService: AutenticacionService) {
    /* this.bnIdle.startWatching(600).subscribe((res) => {
      if (res) {
        this.autenticacionService.Logout();
      }
    });
*/
  }

}
