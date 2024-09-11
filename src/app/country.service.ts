import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiUrl = 'https://api.worldbank.org/v2/country?format=json&per_page=300'; 

  constructor(private http: HttpClient) {}

  getCountries(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getCountryDetails(countryCode: string): Observable<any> {
    const url = `https://api.worldbank.org/v2/country/${countryCode}?format=json`;
    return this.http.get(url);
  }
}







