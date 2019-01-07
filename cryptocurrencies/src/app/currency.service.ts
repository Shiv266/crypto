import { Injectable } from '@angular/core';
// importing http client to make the requests
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler } from '../../node_modules/@angular/router/src/router';
import { observable, Observable } from '../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  public baseurl = "https://api.coinmarketcap.com/v2/";
  public graphUrl = 'https://graphs2.coinmarketcap.com/currencies/';
  constructor(private _http: HttpClient) { }

  // handling Error
  private handleError(err: HttpErrorResponse) {
    console.log("Handle Error");
    console.log(err.message);
    console.log(err.status);
    return Observable.throw(err.message);
  }
  // getting all currencies
  public getAllCurrency(): any {
    let currency = this._http.get(this.baseurl + 'ticker/');
    return currency;
  }

  //getting graph data
  public getAllGraphData(): any {
    let priceTime = this._http.get(this.graphUrl);

    return priceTime;
  }




}
