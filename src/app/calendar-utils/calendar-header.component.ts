import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CalendarView } from 'angular-calendar';

@Component({
  selector: 'mwl-demo-utils-calendar-header',
  template: `
    <div class="row text-center">
      <div class="col-md-4">
        <div class="btn-group">
          <div
            class="btn btn-primary"
            mwlCalendarPreviousView
            [view]="view"
            [(viewDate)]="viewDate"
            (viewDateChange)="viewDateChange.next(viewDate)"
          >
            Previous
          </div>
          <div
            class="btn btn-outline-secondary"
            mwlCalendarToday
            [(viewDate)]="viewDate"
            (viewDateChange)="viewDateChange.next(viewDate)"
          >
            Today
          </div>
          <div
            class="btn btn-primary"
            mwlCalendarNextView
            [view]="view"
            [(viewDate)]="viewDate"
            (viewDateChange)="viewDateChange.next(viewDate)"
          >
            Next
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <h3>{{ viewDate | calendarDate: view + 'ViewTitle':locale }}</h3>
      </div>
    </div>
    <br />
  `
})
export class CalendarHeaderComponent {
  @Input() view: CalendarView | 'month' | 'week' | 'day';

  @Input() viewDate: Date;

  @Input() locale: string = 'en';

  @Output() viewChange: EventEmitter<string> = new EventEmitter();

  @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();
}
