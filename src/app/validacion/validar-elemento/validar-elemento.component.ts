import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-validar-elemento',
  templateUrl: './validar-elemento.component.html',
  styleUrls: ['./validar-elemento.component.css']
})
export class ValidarElementoComponent implements OnInit {

  public data: { Id: number; Element: string; } = null;

  constructor(protected route: ActivatedRoute) {
    console.log('entra');
  }

  ngOnInit(): void {
    this.route.data.subscribe((d: { Id: number; Element: string; }) => {
      this.data = d;
    });
  }

}
