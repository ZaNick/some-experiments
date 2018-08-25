import { Component, forwardRef, Input, OnChanges, OnInit } from '@angular/core';
import { allowedDocType, allowedImageType } from '../../../utils/mime-types';
import { FileUploader } from 'ng2-file-upload';
import { MatSnackBar } from '@angular/material';
import {
  AbstractControl,
  ControlValueAccessor, FormArray, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR,
  Validators
} from '@angular/forms';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true,
    }
  ]
})
export class FileUploadComponent implements ControlValueAccessor, OnInit, OnChanges {
  serverUrl: string;

  _options: {
    onlyImages?: boolean,
    onlyDocuments?: boolean,
    numberInput?: boolean,
    // removeOnImage?: boolean,
    canRemove?: boolean,
    isMultiple?: boolean,
    limitTo?: number
  };

  @Input()
  set options(obj) {
    this.setOptions(obj);
  }

  uploader: FileUploader = new FileUploader({});
  allowedImageType = allowedImageType;
  allowedDocType = allowedDocType;
  allowedTypes: string;
  isFileOver = false;
  f: FormGroup;
  filesArr: FormArray;

  private validateFn: any = '';
  private propagateChange = (_: any) => {
  }

  constructor(public snackBar: MatSnackBar,
    private fb: FormBuilder) {
  }


  ngOnInit() {
    if (!this._options) {
      this.setOptions({});
    }

    this.filesArr = this.fb.array([]);


    this.f = this.fb.group({
      files: this.filesArr
    });
    // init set
    this.propagateChange(this.filesArr.value);


    this.f.valueChanges.subscribe(() => {
      this.propagateChange(this.filesArr.value);
    });


    this.uploader.onAfterAddingFile = (fileItem: any) => {
      this.onFileEmit(fileItem);
    };


    if (this._options && this._options.onlyImages) {
      this.allowedTypes = this.allowedImageType.toString();
    } else if (this._options && this._options.onlyDocuments) {
      this.allowedTypes = this.allowedDocType.toString();
    } else {
      this.allowedTypes = this.allowedImageType.toString() + this.allowedDocType.toString();
    }
  }

  setOptions(obj) {
    this._options = {
      onlyImages: obj.onlyImages,
      onlyDocuments: obj.onlyDocuments,
      numberInput: obj.numberInput,
      // removeOnImage: obj.removeOnImage,
      // canRemove: 'removeOnImage' in obj ? obj.removeOnImage : true,
      canRemove: 'canRemove' in obj ? obj.canRemove : true,
      isMultiple: obj.isMultiple,
      limitTo: obj.limitTo || 100
    };
  }

  minLengthArray(min: number) {
    return (c: AbstractControl): { [key: string]: any } => {
      if (c.value.length >= min) {
        return null;
      }
      return { 'minLengthArray': { valid: false } };
    };
  }

  pushFile(item) {
    this.filesArr.push(this.fb.group({
      link: new FormControl(item.link ? item.link : null),
      name: item.name ? item.name : null,
      type: item.type ? item.type : null,
      numberInput: item.numberInput ? [item.numberInput, [Validators.required, Validators.minLength(1)]] : null
    }));
  }

  onFileEmit(fileItem) {
    const formData = new FormData();
    formData.append('file', fileItem._file);


    if (this.allowedImageType.toString().match(fileItem._file.type)) {
      // this._uploadService.uploadImage(formData)
      //   .subscribe((res: any) => {
      //     res.links.forEach((item) => this.pushFile(item));
      //     this.snackBar.open('Файл добавлен!', 'ok', {
      //       duration: 3000,
      //     });
      //   }, (err) => {
      //     this.snackBar.open(err.detail, 'ok', {
      //       duration: 3000,
      //     });
      //   });
    } else if (this.allowedDocType.toString().match(fileItem._file.type)) {
      // this._uploadService.uploadDocument(formData)
      //   .subscribe((res: any) => {
      //     res.links.forEach((item) => this.pushFile(item));
      //     this.snackBar.open('Файл добавлен!', 'ok', {
      //       duration: 3000,
      //     });
      //   }, (err) => {
      //     this.snackBar.open(err.detail, 'ok', {
      //       duration: 3000,
      //     });
      //   });
    } else {
      this.snackBar.open('Формат не поддерживается', 'ok', {
        duration: 3000,
      });
    }
  }

  onFileRemove(i) {
    const control = <FormArray>this.f.controls['files'];
    control.removeAt(i);

    control.patchValue(this.filesArr.value);
  }

  onFileOver(e) {
    this.isFileOver = e;
  }

  writeValue(arr): void {
    if (this.f.get('files')) {
      const formArray = <FormArray>this.f.get('files');
      formArray.controls = [];
    }

    if (arr && arr.length > 0) {
      arr.forEach(item => {
        this.pushFile(item);
      });
    }
  }

  ngOnChanges(changes) {
  }

  registerOnChange(fn: any): void {
    this.propagateChange = (value) => {
      Promise.resolve(null).then(() => fn(value));
    };
    this.propagateChange(this.filesArr.value);
  }

  registerOnTouched(fn: any): void {

  }

  validate(fc: FormControl) {
    if (fc.getError('required')) {
      this.f.get('files').setValidators(this.minLengthArray(1));
    }

    if (this._options && this._options.numberInput && fc.value) {
      fc.value.forEach(item => {
        if (!item.numberInput) {
          this.f.setErrors({ 'numberInput': false });
        } else {
          this.f.setErrors(null);
        }
      });
    }

    return this.f.valid ? null : { 'valid': false };
  }
}
