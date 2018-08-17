import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../../services/room.service';

@Component({
  selector: 'app-room-picker',
  templateUrl: './room-picker.component.html',
  styleUrls: ['./room-picker.component.css']
})
export class RoomPickerComponent implements OnInit {
  rooms = [];
  selectedRoom: number;
  constructor(private _roomService: RoomService) { }

  ngOnInit() {
    this._roomService.getAllRooms().subscribe((res: Array<any>) => {
      this.rooms = res;
    });
  }

  roomSelect(roomId) {
    this.selectedRoom = roomId;
  }

}
