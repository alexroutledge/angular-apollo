/*
 * Copyright (c) 2017-2018 Company Name.
 * All rights reserved.
 *
 * Company Name and the Company Name logo are trademarks
 * or registered trademarks of Company Name
 * or its affiliates in the U.S. and other countries.
 * Other names may be trademarks of their respective owners.
 *
 * WATERMARK
 */

import { expect } from 'chai';
import app from './app';

describe('Jasmine server tests', () => {

  it('first test', () => {
    const test = app.express;
    expect(true).to.be.true;
  });

});
