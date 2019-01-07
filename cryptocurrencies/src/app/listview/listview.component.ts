import { Component, EventEmitter, Output, OnInit } from '@angular/core';
//Route related code to get currency id
import { ActivatedRoute, Router } from '@angular/router';
import { LOCAL_STORAGE } from 'angular-webstorage-service';
import { CurrencyService } from '../currency.service';

@Component({
  selector: 'app-listview',
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.css'],
  providers: []
})
export class ListviewComponent implements OnInit {
  public key: string;
  public reverse: boolean = false;
  public allCurrency = [];
  public arr = [];
  public arrCopy = [];
  public result = [];
  public Length: any;
  public selected: any;
  selectedIndex: number = null;
  public favData = [];
  public favourtiCoin = [];
  public selectedCoin = [];
  public comparsionId = [];

  constructor(private _route: ActivatedRoute, private router: Router, public listservice: CurrencyService) { }

  ngOnInit() {
    //getting all currency
    this.listservice.getAllCurrency().subscribe(
      data => {
        this.allCurrency = data.data;
        for (let element in this.allCurrency) {
          this.arr.push(this.allCurrency[element]);
        }
        this.arrCopy = this.arr;
      },
      error => {
        console.log(error);
      }
    )
  }

  public sort(key) {
    this.key = key;
    this.reverse = !this.reverse;

  }
  p: number = 1;

  //For range slider
  public myOnFinish(event1, type) {
    let min = event1.from;
    let max = event1.to;

    if (type === 'marketCap') {
      if (this.result.length > 0) {
        this.result = this.result.filter(word => (word.quotes.USD.market_cap > min && word.quotes.USD.market_cap < max));
      } else {
        this.result = this.arrCopy.filter(word => (word.quotes.USD.market_cap > min && word.quotes.USD.market_cap < max));
      }
    } else {
      if (this.result.length > 0) {
        this.result = this.result.filter(word => (word.quotes.USD.price > min && word.quotes.USD.price < max));
      } else {
        this.result = this.arrCopy.filter(word => (word.quotes.USD.price > min && word.quotes.USD.price < max));
      }
    }

    this.arr = this.result;


  }
  // Fav selected coin in local storage
  onSelect(j) {

    let key = 'id';
    this.favData.push(j);
    localStorage.setItem(key, JSON.stringify(this.favData));
    this.selected = (this.selected === j ? null : j);

  }
  isActive(j) {
    return this.selected === j;
  };


  chartPrice(name): void {
    this.router.navigate(['/chart', name.id]);
  }

  // function for select coin by checkbox 
  onChange(id: number, isChecked: boolean) {
    if (isChecked) {
      this.comparsionId.push(id);
    } else {
      this.comparsionId.splice(0, this.comparsionId.length);

      if (isChecked) {
        this.comparsionId.push(id);
      }
    }
  }

  // navigate comparison chart component 
  OnSelectCurrency() {
    if (this.comparsionId.length > 2) {
      alert("Please select only two currency");
      location.reload(true);

    }
    else {
      console.log(this.comparsionId);
      this.router.navigate(['/comparisionView', this.comparsionId[0], this.comparsionId[1]]);

    }

  }

}
