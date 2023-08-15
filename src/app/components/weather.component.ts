import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeatherService } from '../services/weather.service';
import { Weather } from '../models/weather';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  city!: string;
  subscription$!: Subscription;

  model = new Weather("Singapore", 0, 0, 0, "", 0, 0);
  apiKey: string = '476e23fe1116f4e69d2a3e68672604e1';

  constructor(private fb: FormBuilder, private weatherSvc: WeatherService) {}

  ngOnInit(): void {
    this.form = this.createForm();
  }

  ngOnDestroy(): void {

  }

  private createForm(): FormGroup {
    return this.fb.group({city: this.fb.control<string>('', [Validators.required])});
  }

  resetForm() {
    this.form = this.createForm();
  }

  searchWeather() {
    console.log("search weather");
    this.city = this.form.value['city'];
    console.log(this.city);

    // this.weatherSvc.getWeather(this.city, this.apiKey)
    //                 .then((result) => {
    //                   this.model = new Weather(
    //                     this.city, result.main.temp, result.main.pressure,
    //                     result.main.humidity, result.weather[0].description,
    //                     result.wind.deg, result.wind.speed)
    //                 })
    //                 .catch((error) => {
    //                   console.error(error);
    //                 });

    this.subscription$ = this.weatherSvc.getWeatherUsingObservable(this.city, this.apiKey)
                                        .subscribe({
                                          next: (result) => {console.log(result);
                                          this.model = new Weather(
                                            this.city, result.main.temp, result.main.pressure,
                                            result.main.humidity, result.weather[0].description,
                                            result.wind.deg, result.wind.speed
                                          )},
                                          error: (err) => {console.error(err)},
                                          complete: () => { this.subscription$.unsubscribe() }
                                          })
  }

}
