import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getAPIResponse(email, subject, body){
    return this.http.post('http://interview-contact-submit-api-lb-1009699934.us-east-1.elb.amazonaws.com/contact-us/send', {
      'email': email,
      'subject': subject,
      'body': body
    })
  }
}
