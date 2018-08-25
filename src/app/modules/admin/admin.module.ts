import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomManageComponent } from './rooms/room-manage/room-manage.component';

import {DragulaModule} from 'ng2-dragula';
import {FileUploadModule} from 'ng2-file-upload';
import { FileUploadComponent } from './file-upload/file-upload.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    DragulaModule,
    FileUploadModule,
  ],
  declarations: [AdminComponent, RoomsComponent, RoomManageComponent, FileUploadComponent]
})
export class AdminModule { }
