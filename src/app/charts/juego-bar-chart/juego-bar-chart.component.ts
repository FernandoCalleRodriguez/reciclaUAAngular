import { MaterialService } from '../../shared/services/materiel.service';
import { NivelService } from '../../shared/services/nivel.service';
import { ItemService } from '../../shared/services/item.service';
import { UsuarioService } from '../../shared/services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Color } from 'ng2-charts';

@Component({
  selector: 'app-juego-bar-chart',
  templateUrl: './juego-bar-chart.component.html',
  styleUrls: ['./juego-bar-chart.component.css']
})
export class JuegoBarChartComponent implements OnInit {

  constructor(private materialService : MaterialService,private nivelService: NivelService, private itemsService: ItemService, private usuarioService: UsuarioService) { }
  public barChartColors: Color[] = [
    { backgroundColor: '#007bff' },
  ];
  public barChartOptions = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,

        },
      }]
    },
    scaleShowHorizontalLines:false,
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    { data: [],label:'Juego' },
  ];
  ngOnInit(): void {
    this.nivelService.getNivel().subscribe(res => {
      this.barChartLabels.push("niveles");
      this.barChartData[0].data.push("" + res.length);
    });
    this.itemsService.getItems().subscribe(res => {
      this.barChartLabels.push("items");
      this.barChartData[0].data.push("" + res.length);
    })
    this.materialService.getMaterial().subscribe(res => {
      this.barChartLabels.push("mateial");
      this.barChartData[0].data.push("" + res.length);
    })
  
  }

}
