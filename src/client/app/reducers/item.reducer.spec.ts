/*
 * Copyright (c) 2018 Company Name.
 * All rights reserved.
 *
 * Company Name and the Company Name logo are trademarks
 * or registered trademarks of Company Name
 * or its affiliates in the U.S. and other countries.
 * Other names may be trademarks of their respective owners.
 *
 * WATERMARK
 */

import { TestBed, inject } from '@angular/core/testing';

import { itemReducer } from './item.reducer';

describe('ItemReducerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [itemReducer]
    });
  });

  it('should be created', inject([itemReducer], (service: any) => {
    expect(service).toBeTruthy();
  }));
});
