import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { BookingStepperComponent } from './booking-stepper/booking-stepper.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'booking', component: BookingStepperComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
