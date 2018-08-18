import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { MaterialModule } from '../shared/material.module';
import { BookingStepperComponent } from './booking-stepper/booking-stepper.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DateRangeComponent } from './date-range/date-range.component';
import { RoomPickerComponent } from './room-picker/room-picker.component';
import { RoomCardComponent } from './room-picker/room-card/room-card.component';
import { ImgSliderComponent } from './img-slider/img-slider.component';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxMaskModule,
  ],
  declarations: [HomeComponent, BookingStepperComponent, DateRangeComponent, RoomPickerComponent, RoomCardComponent, ImgSliderComponent]
})
export class HomeModule { }
