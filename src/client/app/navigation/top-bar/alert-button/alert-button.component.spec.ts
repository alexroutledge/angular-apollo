/*
 * Copyright (c) 2018 Veritas Technologies LLC.
 * All rights reserved.
 *
 * Veritas and the Veritas Logo are trademarks
 * or registered trademarks of Veritas Technologies LLC
 * or its affiliates in the U.S. and other countries.
 * Other names may be trademarks of their respective owners.
 *
 * IV49-4028-9371-66-15-7
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertButtonComponent } from './alert-button.component';
import { VdlRootModule } from 'vdl-angular';
import { HttpClientModule } from '@angular/common/http';

describe('AlertButtonComponent', () => {
  let component: AlertButtonComponent;
  let fixture: ComponentFixture<AlertButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertButtonComponent ],
      imports: [
        HttpClientModule,
        VdlRootModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
