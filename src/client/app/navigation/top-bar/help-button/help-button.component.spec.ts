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
import { HelpButtonComponent } from './help-button.component';
import { VdlRootModule } from 'vdl-angular';
import { HttpClientModule } from '@angular/common/http';

describe('HelpButtonComponent', () => {
  let component: HelpButtonComponent;
  let fixture: ComponentFixture<HelpButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpButtonComponent ],
      imports: [
        HttpClientModule,
        VdlRootModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
