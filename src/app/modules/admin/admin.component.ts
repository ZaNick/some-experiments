import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  options: FormGroup;
  sections = [
    { name: 'Комнаты', uri: 'rooms', icon: 'info' },
    { name: 'Клиенты', uri: 'clients', icon: 'info' },
    { name: 'Заявки на бронь', uri: 'booking', icon: 'info' },
    { name: 'Архив', uri: 'archive', icon: 'info' },
  ];

  constructor(fb: FormBuilder) {
    this.options = fb.group({
      bottom: 0,
      fixed: false,
      top: 0
    });
  }

  ngOnInit() {
  }

  showInfo(link) {
    console.log(link);
  }

  clickList() {
    console.log('clickList');
  }
}
