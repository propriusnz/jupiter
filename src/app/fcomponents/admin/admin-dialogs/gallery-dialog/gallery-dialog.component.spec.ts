/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GallerydialogComponent } from './gallery-dialog.component';

describe('GallerydialogComponent', () => {
  let component: GallerydialogComponent;
  let fixture: ComponentFixture<GallerydialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GallerydialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GallerydialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
