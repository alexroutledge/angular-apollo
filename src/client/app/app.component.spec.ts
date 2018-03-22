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

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { VdlIconRegistry, VdlRootModule } from 'vdl-angular';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {

  const mockVdlIconRegistry: VdlIconRegistry = jasmine.createSpyObj(
    'mockVdlIconRegistry', ['registerFontClassAlias', 'addSvgIcon']
  );

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        }),
        VdlRootModule
      ],
      providers: [
        { provide: VdlIconRegistry, useValue: mockVdlIconRegistry }
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
