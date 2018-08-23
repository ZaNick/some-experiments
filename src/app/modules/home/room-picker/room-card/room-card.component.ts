import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.css']
})
export class RoomCardComponent implements OnInit {
  @Input() room = {};
  @Output() emitRoom = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onRoomSelect(room) {
    this.emitRoom.emit(room);
  }

}
