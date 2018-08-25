import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AdminRoomService {
  constructor(private _http: HttpClient) { }

  getAllRooms() {
    return this._http.get('./assets/all-rooms.json');
  }

  getRoomById(id: number) {
    console.log('getting room with id = ', id);
    // return this._http.get('/api/room/${id}');
    return this._http.get('./assets/single-room.json');
  }
}
