import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

////Importing http module for http request
import{HttpClientModule} from '@angular/common/http';

//Routing module
import{RouterModule,Routes} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
// service
import { CurrencyService } from './currency.service';
// datatable module
import { DataTablesModule } from 'angular-datatables';
import { StorageServiceModule} from 'angular-webstorage-service';
//pagination module
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe';
// FontAwesome module
import { AngularFontAwesomeModule } from 'angular-font-awesome';

// components used in application
import { ListviewComponent } from './listview/listview.component';
import { FavlistComponent } from './favlist/favlist.component';
import { ChartComponent } from './chart/chart.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ComparisonChartComponent } from './comparison-chart/comparison-chart.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonRangeSliderModule } from "ng2-ion-range-slider";


//decorator
@NgModule({
  declarations: [
    AppComponent,
    ListviewComponent,
    FavlistComponent,
    ChartComponent,
    NotFoundComponent,
    ComparisonChartComponent
  ],

  // contain all the modules
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    DataTablesModule,
    StorageServiceModule,
    IonRangeSliderModule,
    NgxPaginationModule,
    AngularFontAwesomeModule,
    Ng2OrderModule,
    // configuring paths
    RouterModule.forRoot([
      
      {path:'listview',component:ListviewComponent},
      {path :'',pathMatch: 'full',  redirectTo:'listview'},
      {path:'favlist',component:FavlistComponent},
      {path :'comparisionView/:id1/:id2', component:ComparisonChartComponent},
      {path :'chart/:id', component:ChartComponent},
      {path:'**',component:NotFoundComponent}
    ])

  ],
  providers: [CurrencyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
