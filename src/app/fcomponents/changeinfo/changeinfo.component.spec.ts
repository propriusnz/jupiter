import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeinfoComponent } from './changeinfo.component';

describe('ChangeinfoComponent', () => {
  let component: ChangeinfoComponent;
  let fixture: ComponentFixture<ChangeinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
