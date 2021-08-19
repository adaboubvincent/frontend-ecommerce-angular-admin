import { Component, OnInit } from '@angular/core';
import {Color, Label} from "ng2-charts";
import {ChartDataSets, ChartOptions, ChartType} from "chart.js";


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor() { }

  public lineChartData: ChartDataSets[] = [
    { data: [75, 98, 80, 93, 56, 59, 80, 90, 54, 67, 37, 60], label: 'Commandes' },
  { data: [65, 105, 80, 87, 63, 63, 60, 93, 60, 55, 45, 80], label: 'Livraisons' },
  ];
  public lineChartLabels: Label[] = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Juill', 'aout', 'sept', 'oct', 'nov', 'dec'];
  public lineChartOptions: (ChartOptions & { annotation ?: any }) = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  ngOnInit(): void {
    if (localStorage.getItem('pageReload') === 'true'){
      localStorage.setItem('pageReload', 'false');
      window.location.reload();
    }
  }

}
