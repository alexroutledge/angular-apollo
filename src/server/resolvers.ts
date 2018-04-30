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

import { PubSub, withFilter } from 'graphql-subscriptions';
import { random } from 'lodash';

let nextUserId = 1;
const pubsub = new PubSub();
setInterval(() => {
  pubsub.publish('userAdded', {
    channelId: 1,
    userAdded: {
      id: nextUserId++,
      count: random(1, 50)
    }
  });
}, 1000);
const channels = [{
    id: '1',
    name: 'soccer',
    messages: [{
        id: '1',
        text: 'soccer is football',
    }, {
        id: '2',
        text: 'hello soccer world cup',
    }]
}, {
    id: '2',
    name: 'baseball',
    messages: [{
        id: '3',
        text: 'baseball is life',
    }, {
        id: '4',
        text: 'hello baseball world series',
    }]
}];
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
let nextId = 3;
let nextMessageId = 5;

export const resolvers = {
  Query: {
    channels: () => {
      return channels;
    },
    channel: (root, { id }) => {
      return channels.find((channel) => channel.id === id);
    },
    allUsers: getUsers,
    allCourses: getAllCourses,
    course: getCourse
  },
  Mutation: {
    addChannel: (root, args) => {
      const newChannel = { id: String(nextId++), messages: [], name: args.name };
      channels.push(newChannel);
      return newChannel;
    },
    addMessage: (root, { message }) => {
      const currentChannel = channels.find((channel) => channel.id === message.channelId);
      const newMessage = { id: String(nextMessageId++), text: message.text };
      currentChannel.messages.push(newMessage);
      pubsub.publish('messageAdded', { messageAdded: newMessage, channelId: message.channelId });
      return newMessage;
    },
  },
  Subscription: {
    messageAdded: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('messageAdded'),
        (payload, variables) => {
          return payload.channelId === variables.channelId;
        }
      )
    },
    userAdded: {
        subscribe: withFilter(
          () => pubsub.asyncIterator('userAdded'),
          (payload, variables) => true
        )
      }
  }
};
