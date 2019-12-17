import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailsentDialogComponent } from './emailsent-dialog.component';

describe('EmailsentDialogComponent', () => {
  let component: EmailsentDialogComponent;
  let fixture: ComponentFixture<EmailsentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailsentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailsentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
