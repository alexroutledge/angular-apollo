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
import * as express_graphql from 'express-graphql';
import { buildSchema } from 'graphql';
import * as cors from 'cors';

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
    const coursesData = [
      {
          id: 1,
          title: 'The Complete Node.js Developer Course',
          author: 'Andrew Mead, Rob Percival',
          description:
          'Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!',
          topic: 'Node.js',
          url: 'https://codingthesmartway.com/courses/nodejs/'
      },
      {
          id: 2,
          title: 'Node.js, Express & MongoDB Dev to Deployment',
          author: 'Brad Traversy',
          description:
          'Learn by example building & deploying real-world Node.js applications from absolute scratch',
          topic: 'Node.js',
          url: 'https://codingthesmartway.com/courses/nodejs-express-mongodb/'
      },
      {
          id: 3,
          title: 'JavaScript: Understanding The Weird Parts',
          author: 'Anthony Alicea',
          description:
          `An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own
          framework, and more.`,
          topic: 'JavaScript',
          url: 'https://codingthesmartway.com/courses/understand-javascript/'
      }
    ];
    const getCourse = (args) => {
        const id = args.id;
        return coursesData.find((course) => {
            return course.id === id;
        });
    };
    const getAllCourses = () => {
      return coursesData;
    };
    const getUsers = () => {
      return [
        {
          id: 1,
          count: 9
        },
        {
          id: 2,
          count: 3
        },
        {
          id: 3,
          count: 9
        },
        {
          id: 4,
          count: 45
        },
        {
          id: 5,
          count: 5
        },
        {
          id: 6,
          count: 9
        },
        {
          id: 7,
          count: 7
        }
      ];
    };
    // GraphQL schema
    const schema = buildSchema(`
      type Query {
        allUsers: [User],
        allCourses: [Course],
        course(id: Int!): Course
      },
      type Course {
          id: Int
          title: String
          author: String
          description: String
          topic: String
          url: String
      },
      type User {
        id: Int
        count: Int
      }
    `);

    // Root resolver
    const rootValue = {
      allUsers: getUsers,
      allCourses: getAllCourses,
      course: getCourse
    };
    app.use(express.static(staticRoot));
    app.get('/', (req, res) => {
      res.sendFile('index.html', { root: staticRoot });
    });
    app.get('/api', (req, res) => {
      res.json({
        message: 'Hello World!'
      });
    });
    app.use('/graphql', cors(), express_graphql({
      schema,
      rootValue,
      graphiql: false
    }));
    this.express.use('/', app);
  }
}

export default new App().express;
