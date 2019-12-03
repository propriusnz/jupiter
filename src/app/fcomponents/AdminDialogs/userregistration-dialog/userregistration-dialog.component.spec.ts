import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserregistrationDialogComponent } from './userregistration-dialog.component';

describe('UserregistrationDialogComponent', () => {
  let component: UserregistrationDialogComponent;
  let fixture: ComponentFixture<UserregistrationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserregistrationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserregistrationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
