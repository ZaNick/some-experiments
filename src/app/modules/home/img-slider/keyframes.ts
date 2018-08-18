import { keyframes, style } from '@angular/animations';

export const slideOutLeft = [
  style({ transform: 'translate3d(0, 0, 0)', offset: 0 }),
  style({ transform: 'translate3d(-150%, 0, 0)', opacity: 0, offset: 1 }),
];

export const zoomOutRight = [
  style({ transform: 'scale(1) translate3d(-20px, 0, 0)', opacity: 1, offset: 0 }),
  style({ transform: 'scale(.7) translate3d(70px, 0, 0)', 'transform-origin': 'right center', opacity: 0, offset: 1 }),
];

export const zoomOutLeft = [
  style({ transform: 'scale(1) translate3d(20px, 0, 0)', opacity: 1, offset: 0 }),
  style({ transform: 'scale(.7) translate3d(-70px, 0, 0)', 'transform-origin': 'left center', opacity: 0, offset: 1 }),
];

export const zoomIn = [
  style({ transform: 'scale3d(0.3, 0.3, 0.3)', opacity: 0, offset: 0 }),
  style({ transform: 'scale3d(1, 1, 1)', opacity: 1, offset: 1 }),
];
