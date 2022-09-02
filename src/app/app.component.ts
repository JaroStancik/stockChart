import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { IstockData } from './IstockData';
import { NotificationService } from './notification.service';
import { env } from '../environments/env';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  myApiKey: string = env.apiKey; // use here your generated apiKey from the https://polygon.io/docs/stocks/getting-started
  httpsUrl: string = 'https://api.polygon.io';
  stockData: any;
  btnDisabled: boolean = false;
  ticker: string = '';

  constructor(
    private http: HttpClient,
    private notifyService: NotificationService
  ) {}

  // TODO:
  // fix => do not change all class when disabling button, change just background color style
  // add time range selector
  // add chart

  ngOnInit(): void {
    this.fetchPosts();
  }

  onFetchPosts(ticker: string): void {
    this.fetchPosts(ticker);
  }

  fetchPosts(ticker: string = 'VOO') {
    // default VOO is ticker for S&P 500
    this.http
      .get<IstockData>(
        this.httpsUrl +
          '/v2/aggs/ticker/' +
          ticker.toUpperCase() +
          '/range/1/day/2022-08-17/2022-08-17?adjusted=true&sort=asc&limit=120&apiKey=' +
          this.myApiKey
        // 'https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2021-07-22/2021-07-22?adjusted=true&sort=asc&limit=120&apiKey=uXap2pPhTixSUYreiz7_cSp2UAmp_Hl2'
      )
      .subscribe({
        next: (responseData) => {
          console.log(responseData);
          if (responseData?.resultsCount > 0) {
            this.stockData = { ...responseData };
          } else {
            console.log('The data for the ticker does not exists.');
            this.notifyService.showError(
              'The data for the ticker does not exists.',
              ''
            );
          }
        },
        error: (error) => {
          console.log('LOG', error.error.error);
          this.notifyService.showError(error.error.error, '');
        }}
      );
  }

  onKeyup(event: Event) {
    (event.target as HTMLInputElement).value.length === 0
      ? (this.btnDisabled = true)
      : (this.btnDisabled = false);
  }

  // when cross icon/clearing or enter is pressed
  onSearch(event: Event) {
    this.ticker = (event.target as HTMLInputElement).value;

    if (this.ticker.length > 0) this.fetchPosts(this.ticker);
    else this.btnDisabled = true;
  }
}
