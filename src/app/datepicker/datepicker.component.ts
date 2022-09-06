import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { formatDateToString } from './formatter';

@Component({
  selector: 'datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})
export class DatepickerComponent implements OnInit {
  @Input() defaultDate: string = '';
  @Output() onDateChange: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onDate(event: MatDatepickerInputEvent<Date>) {
    this.onDateChange.emit(formatDateToString(event.value!));
  }
}
