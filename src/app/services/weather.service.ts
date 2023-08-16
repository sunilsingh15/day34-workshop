import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Weather } from '../models/weather';
import { Observable, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  apiURL: string = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private httpClient: HttpClient) { }

  getWeather(city: string, key: string): Promise<any> {
    const params = new HttpParams()
      .set('q', city)
      .set('appid', key);

      return lastValueFrom(this.httpClient.get<Weather>(this.apiURL, {params: params}));
  }

  getWeatherUsingObservable(city: string, key: string): Observable<any> {
    const params = new HttpParams()
      .set('q', city)
      .set('appid', key);

      return this.httpClient.get<Weather>(this.apiURL, {params: params});
  }
}
