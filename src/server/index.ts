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

import app from './app';
import { environment } from './../client/environments/environment';
import { Constants } from './constants';

const port = Constants.PORT;

app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }
  return console.log(`server is listening on ${port}`);
});
