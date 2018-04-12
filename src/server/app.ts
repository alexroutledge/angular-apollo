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
