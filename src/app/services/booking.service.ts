import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const url = 'https://jsonplaceholder.typicode.com/posts';

@Injectable()
export class BookingService {

  constructor(private _http: HttpClient) { }

  bookIt(body) {
    this._http.post(url, body);
  }

}
