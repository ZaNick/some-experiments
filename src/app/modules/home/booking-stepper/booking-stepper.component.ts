import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RoomService } from '../../../services/room.service';
import { MatStepper } from '@angular/material';
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
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  rooms = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _fb: FormBuilder,
  ) {
    this.bookingForm = _fb.group({
      step1: _fb.group({
        dateFrom: [null, Validators.required],
        dateTo: [null, Validators.required],
      }),
      step2: _fb.group({
        roomId: [null, Validators.required]
      }),
      step3: _fb.group({
        name: [null, Validators.required],
        phone: [null, Validators.required],
        comment: [null, Validators.required],
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
  }

  setDateRange(dRange: DateRange) {
    console.log(dRange);
    this.bookingForm.get('step1.dateFrom').setValue(dRange.from);
    this.bookingForm.get('step1.dateTo').setValue(dRange.to);
  }

  roomSelect(roomId) {
    this.bookingForm.get('step2.roomId').setValue(roomId);
    this.goForward();
  }

  goForward() {
    this.stepper.next();
  }
}
