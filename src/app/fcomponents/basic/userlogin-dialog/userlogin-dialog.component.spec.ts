import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserloginDialogComponent } from './userlogin-dialog.component';

describe('DialogComponent', () => {
  let component: UserloginDialogComponent;
  let fixture: ComponentFixture<UserloginDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserloginDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserloginDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
