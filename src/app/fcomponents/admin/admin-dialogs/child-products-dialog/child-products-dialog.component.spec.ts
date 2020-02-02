import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildProductsDialogComponent } from './child-products-dialog.component';

describe('ChildProductsDialogComponent', () => {
  let component: ChildProductsDialogComponent;
  let fixture: ComponentFixture<ChildProductsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildProductsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildProductsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
