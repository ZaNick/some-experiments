import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import * as _moment from 'moment';
import { DateRange } from '../../../interfaces/DateRange';

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.css']
})
export class DateRangeComponent implements OnInit {

  private _displayMonths;
  private _dateFrom;
  private _dateTo;
  private dateFormat = 'DD-MM-YYYY';

  @Output() dateRange = new EventEmitter<DateRange>();

  @Input() set displayMonths(value) { this._displayMonths = value; }
           get displayMonths() { return this._displayMonths; }

  @Input() set dateFrom(value: NgbDate) { this._dateFrom = value; }
           get dateFrom() { return this._dateFrom; }

  @Input() set dateTo(value: NgbDate) { this._dateTo = value; }
           get dateTo() { return this._dateTo; }


  hoveredDate: NgbDate;

  constructor(private _formatter: NgbDateParserFormatter) {
  }

  ngOnInit() {
    console.log();
  }

  onDateSelection(date) {
    if (!this.dateFrom && !this.dateTo) {
      this.dateFrom = date;
    } else if (this.dateFrom && !this.dateTo && (this.ngbDateT(date).after(this.dateFrom) || this.ngbDateT(date).equals(this.dateFrom))) {
      this.dateTo = date;
    } else {
      this.dateTo = null;
      this.dateFrom = date;
    }
    let dayCount = 0;
    if (this.dateFrom && this.dateTo) {
      const from = _moment(this._formatter.format(this.dateFrom));
      const to   = _moment(this._formatter.format(this.dateTo));
      dayCount = _moment.duration(to.diff(from)).asDays() + 1;
    }

    this.dateRange.emit({
      from: this.dateFrom ? _moment(this._formatter.format(this.dateFrom)).format(this.dateFormat) : null,
      to: this.dateTo ? _moment(this._formatter.format(this.dateTo)).format(this.dateFormat) : null,
      dayCount: dayCount
    });
  }

  ngbDateISO(date: NgbDate) {
    return date.day + '-' + date.month + '-' + date.year;
  }

  /**
   * костыль для ng bootstrap датапикера
   * Ибо date передаваемый из темплейта не являлся NgbDate
   *
   * @param {*} date
   * @returns {NgbDate}
   * @memberof BookingStepperComponent
   */
  ngbDateT(date: any): NgbDate {
    return new NgbDate(date.year, date.month, date.day);
  }

  /**
   * @param {*} date
   * @returns {boolean}
   * @memberof BookingStepperComponent
   */
  isHovered(date: any): boolean {
    return this.dateFrom &&
      !this.dateTo &&
      this.hoveredDate &&
      this.ngbDateT(date).after(this.dateFrom) &&
      this.ngbDateT(date).before(this.hoveredDate);
  }

  /**
   * @param {*} date
   * @returns {boolean}
   * @memberof BookingStepperComponent
   */
  isInside(date: any): boolean {
    return this.ngbDateT(date).after(this.dateFrom) &&
      this.ngbDateT(date).before(this.dateTo);
  }

  /**
   * @param {*} date
   * @returns {boolean}
   * @memberof BookingStepperComponent
   */
  isRange(date: any): boolean {
    return this.ngbDateT(date).equals(this.dateFrom) ||
      this.ngbDateT(date).equals(this.dateTo) ||
      this.isInside(date) || this.isHovered(date);
  }

  isFirst(date: any): boolean {
    return this.ngbDateT(date).equals(this.dateFrom);
  }

  isLast(date: any): boolean {
    return this.ngbDateT(date).equals(this.dateTo);
  }

}
