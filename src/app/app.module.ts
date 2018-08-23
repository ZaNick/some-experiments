import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './modules/shared/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RoomService } from './services/room.service';
import { NgxMaskModule } from 'ngx-mask';
import localeRu from '@angular/common/locales/ru';
import { BookingService } from './services/booking.service';

registerLocaleData(localeRu, 'ru');



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
    NgbModule.forRoot(),
  ],
  providers: [
    DatePipe,
    RoomService,
    BookingService,
    { provide: LOCALE_ID, useValue: 'ru' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
