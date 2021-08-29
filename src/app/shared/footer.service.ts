import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin':'*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class FooterService {

  // URL paths removed

  constructor(private http: HttpClient) { }


  addSubscriber(email){
    return this.http.post(this.addSubscriberUrl, email, httpOptions);
  }
}
