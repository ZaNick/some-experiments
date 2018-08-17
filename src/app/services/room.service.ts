import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RoomService {

  constructor(private _http: HttpClient) { }

  getAllRooms() {
    return this._http.get('./assets/all-rooms.json');
  }
}
