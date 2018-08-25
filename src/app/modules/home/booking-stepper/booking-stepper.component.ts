import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RoomService } from '../../../services/room.service';
import { MatStepper } from '@angular/material';
import { BookingService } from '../../../services/booking.service';
import { DateRange } from '../../../interfaces/DateRange';
// import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';
// import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-booking-stepper',
  templateUrl: './booking-stepper.component.html',
  styleUrls: ['./booking-stepper.component.css']
})
export class BookingStepperComponent implements OnInit {
  @ViewChild('stepper') stepper: MatStepper;
  bookingForm: FormGroup;
  isLinear = true;
  totalCost: number;

  rooms = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _fb: FormBuilder,
    private _bookingService: BookingService,
  ) {
    this.bookingForm = _fb.group({
      step1: _fb.group({
        dateFrom: [null, Validators.required],
        dateTo: [null, Validators.required],
        days: [null, Validators.required],
      }),
      step2: _fb.group({
        room: [null, Validators.required]
      }),
      step3: _fb.group({
        name: [null, Validators.required],
        phone: [null, Validators.required],
        comment: [null],
      })
    });
    console.log(this.bookingForm);
  }

  ngOnInit() {
  }

  setDateRange(dRange: DateRange) {
    console.log(dRange);
    this.bookingForm.get('step1.dateFrom').setValue(dRange.from);
    this.bookingForm.get('step1.dateTo').setValue(dRange.to);
    this.bookingForm.get('step1.days').setValue(dRange.dayCount);
  }

  roomSelect(room) {
    this.bookingForm.get('step2.room').setValue(room);
    this.goForward();
    console.log(this.bookingForm.get('step1').value, this.bookingForm.get('step2').value);
    this.totalCost = this.bookingForm.get('step1.days').value * this.bookingForm.get('step2.room').value.price;
  }

  goForward() {
    this.stepper.next();
  }

  booking() {
    console.log('send order...');
  }
}
