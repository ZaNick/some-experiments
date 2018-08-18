import { Component, OnInit, Input } from '@angular/core';
import { trigger, keyframes, animate, transition } from '@angular/animations';
import * as kf from './keyframes';

@Component({
  selector: 'app-img-slider',
  templateUrl: './img-slider.component.html',
  styleUrls: ['./img-slider.component.css'],
  animations: [
    trigger('animationTrigger', [
      transition('* => zoomOutRight', animate(200, keyframes(kf.zoomOutRight))),
      transition('* => zoomOutLeft', animate(200, keyframes(kf.zoomOutLeft))),
      transition('* => zoomIn', animate(200, keyframes(kf.zoomIn))),
    ])
  ]
})
export class ImgSliderComponent implements OnInit {
  @Input() imgArr = [];

  currentSlide: number;
  totalCount: number;
  animationState: string;
  isHiddenImg = false;

  constructor() { }

  ngOnInit() {
    if (this.imgArr.length) {
      this.totalCount = this.imgArr.length;
      this.currentSlide = 0;
    }
  }

  swipeLeft() {
    console.log('zoomOutLeft');
    this.startAnimation('zoomOutLeft');
  }

  swipeRight() {
    console.log('zoomOutRight');
    this.startAnimation('zoomOutRight');
  }

  nextSlide() {
    const isLast = this.currentSlide === (this.totalCount - 1);
    isLast ? this.currentSlide = 0 : this.currentSlide++;
  }

  prevSlide() {
    const isFirst = this.currentSlide === 0;
    isFirst ? this.currentSlide = this.totalCount - 1 : this.currentSlide--;
  }

  startAnimation(state) {
    this.isHiddenImg = true;
    if (!this.animationState) {
      this.animationState = state;
    }
  }

  resetAnimation(state) {
    if (state === 'zoomOutLeft') {
      this.nextSlide();
    }
    if (state === 'zoomOutRight') {
      this.prevSlide();
    }
    this.animationState = '';
  }

  showImg() {
    this.isHiddenImg = false;
  }

}
