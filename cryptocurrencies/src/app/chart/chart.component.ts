import { Component, OnInit } from '@angular/core';
//route related code 
import { ActivatedRoute, Router } from '@angular/router';
import { Chart } from 'chart.js';
import { CurrencyService } from '../currency.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  public selectedCoin = [];
  public allCurrency = [];
  public arr = [];
  public arrCopy = [];
  chart2 = [];
  public timelines = [];
  date_3 = [];
  public TIME_INTERVAL = 3600;
  public TIMELINE_LENGTH = 12;
  public PriceData = [];
  public key = 'id1';


  constructor(private _route: ActivatedRoute, private router: Router, public listservice: CurrencyService) { }

  ngOnInit() {

    this._init();
    this.drawCharts();
  }

  _init() {
    setInterval(() => {
      localStorage.clear();
      // get currency id from url 
      let myCoinId = this._route.snapshot.paramMap.get('id');

      this.listservice.getAllCurrency().subscribe(
        data => {
          this.allCurrency = data.data;

          for (let element in this.allCurrency) {
            this.arr.push(this.allCurrency[element]);
          }
          this.arrCopy = this.arr;


          // get currency data which id passed in url for graph
          this.selectedCoin = this.arrCopy.filter(word => word.id == myCoinId);

          let date = new Date(this.selectedCoin[0].last_updated * 1000);
          let hours = date.getHours();
          let priceChange = this.selectedCoin[0].quotes.USD.percent_change_1h;
          let price = this.selectedCoin[0].quotes.USD.price;
          if (priceChange <= 0) {
            price = price + price * (priceChange / 100);
          }
          else {
            price = price - price * (priceChange / 100);
          }
          this.timelines.push({
            "hourGraph": hours,
            "priceGraph": price
          });

          this.PriceData.push(this.timelines);
          localStorage.setItem(this.key, JSON.stringify(this.PriceData));

          if (this.timelines.length === this.TIMELINE_LENGTH) {
            this.timelines.shift();
          }

          this.date_3 = JSON.parse(localStorage.getItem(this.key));

          // draw chart for coin 
          this.drawCharts();
          console.log();
        },
        error => {
          console.log(error);
        }
      );
    }, this.TIME_INTERVAL);
  }


  drawCharts() {
    this.chart2 = new Chart("canvas", {
      type: 'line',
      data: {
        labels: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22],
        datasets: [{
          label: 'Price against 24 hours Timeline',
          data: [12, 19, 3, 15, 22, 40, 90, 55, 75, 35, 45, 65],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    })
  }

}
