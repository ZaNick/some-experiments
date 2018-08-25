import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomManageComponent } from './rooms/room-manage/room-manage.component';

const routes: Routes = [
  { path: '', component: AdminComponent, children: [
    {path: 'rooms', component: RoomsComponent},
    {path: 'new-room', component: RoomManageComponent},
    {path: 'edit-room/:roomId', component: RoomManageComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
