import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RoomService } from '../../../services/room.service';
// import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';
// import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-booking-stepper',
  templateUrl: './booking-stepper.component.html',
  styleUrls: ['./booking-stepper.component.css']
})
export class BookingStepperComponent implements OnInit {
  bookingForm: FormGroup;
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  rooms = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _fb: FormBuilder,
    private _roomService: RoomService
  ) {
    this.bookingForm = _fb.group({
      step1: _fb.group({
        dateFrom: [null, Validators.required],
        dateTo: [null, Validators.required],
      })
    });
    console.log(this.bookingForm);
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this._roomService.getAllRooms().subscribe(res => {
      console.log(res);
    });
  }

  setDateRange(dRange: DateRange) {
    console.log(dRange);
    this.bookingForm.get('step1.dateFrom').setValue(dRange.from);
    this.bookingForm.get('step1.dateTo').setValue(dRange.to);
  }
}
