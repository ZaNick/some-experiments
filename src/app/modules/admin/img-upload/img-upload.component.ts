import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-img-upload',
  templateUrl: './img-upload.component.html',
  styleUrls: ['./img-upload.component.css']
})
export class ImgUploadComponent implements OnInit {
  /*
  * принцип следующий
  * когда выбрали изображения, они сразу загружаются на сервер
  * во время загрузки показываем индикатор загрузки,
  * в ответе вернется загруженная картинка
  * после загрузки можно добавить заголовок и описание
  * человек видит массив уже загруженных изображений
  *
  * на крестик изображение удаляется
  *
  * ТуДу
  * можно перетаскивать, меняя последовательность
  */
  imgInput: ElementRef;

  imgList = [];
  loadingImgList = [];
  constructor() { }

  ngOnInit() {
  }

  onInputChange(evt) {
    console.log(evt);
    this.updateImgList(evt.target.files);
  }

  updateImgList(list: FileList) {
    for (const key in list) {
      if (list.hasOwnProperty(key)) {
        const file = list[key];
        this.readURL(file);
      }
    }
  }

  readURL(file) {
    const reader = new FileReader();
    const size = (file.size / (1024 * 1024)) > 1 ? (file.size / (1024 * 1024)) : (file.size / 1024);
    const unit = (file.size / (1024 * 1024)) > 1 ? 'мб' : 'кб';
    const obj = new FormData().append('file', file);
    reader.onload = (e: any) => {
      const src = e.target.result;
      console.log(e);
      this.loadingImgList.push({
        'name': file.name,
        'size': Math.round(size * 100) / 100 + unit,
        'type': file.type,
        'src': src,
        'data': obj
      });
    };

    reader.readAsDataURL(file);
  }

}
