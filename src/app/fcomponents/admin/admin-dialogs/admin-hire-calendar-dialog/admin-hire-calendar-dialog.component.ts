import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay,isSameMonth, addHours } from 'date-fns';
import { colors } from '../../../../calendar-utils/colors';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-admin-hire-calendar-dialog',
  templateUrl: './admin-hire-calendar-dialog.component.html',
  styleUrls: ['./admin-hire-calendar-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AdminHireCalendarDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.dataPrep(data)
  }
  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();

  events: CalendarEvent[] = [
  ];

  ngOnInit() {
  }

  dataPrep(data){
    console.log(data)
    data.data.forEach(element => {
      console.log(element)
      let order = {}
      order['start']= startOfDay(new Date(element.beginDate))
      order['end'] = new Date(element.endDate)
      order['title'] = element.quantity
      this.events.push(order)
    });

  }

}
