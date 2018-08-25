import { Component, OnInit, Input } from '@angular/core';
import { Room } from '../../../../interfaces/Room';
import { AdminRoomService } from '../../../../services/admin-services/room.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-room-manage',
  templateUrl: './room-manage.component.html',
  styleUrls: ['./room-manage.component.css']
})
export class RoomManageComponent implements OnInit {
  room: Room;
  isEdit: boolean;
  roomForm: FormGroup;
  filesToUpload: Array<File>;

  constructor(private _roomService: AdminRoomService,
              private _route: ActivatedRoute,
              private _fb: FormBuilder) {
    this.roomForm = _fb.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      images: [null, Validators.required]
    });
  }

  ngOnInit() {
    // console.log(this._route.outlet);
    this._route.url.subscribe(res => {
      (res[0].path === 'new-room') ? this.isEdit = false : this.isEdit = true;
    });
  }

  onFileSelected(evt) {
    this.filesToUpload = evt.target.files;
  }

  onSubmitForm() {
    const formData: any = new FormData();

    for (const key in this.filesToUpload) {
      if (this.filesToUpload.hasOwnProperty(key)) {
        const element = this.filesToUpload[key];
        // formData.append('uploads[]', files[i], files[i]['name']);
        console.log(element);
      }
    }
    console.log('form data variable :', formData);
  }

}
