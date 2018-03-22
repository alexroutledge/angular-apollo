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

import * as express from 'express';
import * as path from 'path';

class App {
  public express;

  constructor() {
    this.express = express();
    this.mountRoutes();
  }

  private mountRoutes(): void {
    const app = express();
    const router = express.Router();
    const staticRoot = path.resolve(__dirname, '../../dist');
    app.use(express.static(staticRoot));
    app.get('/', (req, res) => {
      res.sendFile('index.html', { root: staticRoot });
    });
    app.get('/api', (req, res) => {
      res.json({
        message: 'Hello World!'
      });
    });
    this.express.use('/', app);
  }
}

export default new App().express;
