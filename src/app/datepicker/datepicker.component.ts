import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { MatDatepickerInputEvent } from '@angular/material/datepicker';

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
    this.onDateChange.emit(event.value!.toISOString().split('T')[0]);
    console.log(event.value!.toISOString().split('T')[0]);
    //TO DO, now toISOString substract 1 day from the actual date and the solution bellow does not keep the MM-DD format => 2.8.2022 is 2022-8-2 but it must be 2022-08-02
    //format to YYYY/MM/DD
    // let newFormatDate = event.value!.toLocaleDateString().split('T')[0]; //https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#non-null-assertion-operator-postfix-
    // let date = newFormatDate.replace(/\//g, '-'); //format to YYYY-MM-DD
    // this.onDateChange.emit(date);
  }
}
