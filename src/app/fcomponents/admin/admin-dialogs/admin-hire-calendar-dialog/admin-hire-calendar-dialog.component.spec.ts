import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHireCalendarDialogComponent } from './admin-hire-calendar-dialog.component';

describe('AdminHireCalendarDialogComponent', () => {
  let component: AdminHireCalendarDialogComponent;
  let fixture: ComponentFixture<AdminHireCalendarDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminHireCalendarDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHireCalendarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
