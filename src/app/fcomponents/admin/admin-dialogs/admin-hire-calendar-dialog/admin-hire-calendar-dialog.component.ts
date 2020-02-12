import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { startOfDay, endOfDay,
  subDays, addDays,
  endOfMonth, isSameDay,
  isSameMonth, addHours
} from 'date-fns';
import { colors } from '../../../../calendar-utils/colors';

@Component({
  selector: 'app-admin-hire-calendar-dialog',
  templateUrl: './admin-hire-calendar-dialog.component.html',
  styleUrls: ['./admin-hire-calendar-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminHireCalendarDialogComponent implements OnInit {

  constructor() { }
  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();

  sd = new Date();
  ed = new Date("2020-02-20T00:00:00");
  events: CalendarEvent[] = [
    {
      start: startOfDay(this.sd),
      end: this.ed,
      title: '1',
      color: colors.blue
    }
  ];

  ngOnInit() {
    console.log(this.events[0])
  }

  ab(a){
    console.log(a)
  }

}
