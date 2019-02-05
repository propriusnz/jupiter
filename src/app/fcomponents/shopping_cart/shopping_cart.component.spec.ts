/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Shopping_cartComponent } from './shopping_cart.component';

describe('Shopping_cartComponent', () => {
  let component: Shopping_cartComponent;
  let fixture: ComponentFixture<Shopping_cartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Shopping_cartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Shopping_cartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
