import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RoomService } from '../../../services/room.service';

@Component({
  selector: 'app-room-picker',
  templateUrl: './room-picker.component.html',
  styleUrls: ['./room-picker.component.css']
})
export class RoomPickerComponent implements OnInit {
  @Output() roomSelect = new EventEmitter<any>();
  rooms = [];

  constructor(private _roomService: RoomService) { }

  ngOnInit() {
    this._roomService.getAllRooms().subscribe((res: Array<any>) => {
      this.rooms = res;
    });
  }

  onRoomSelect(roomId) {
    this.roomSelect.emit(roomId);
  }

}
