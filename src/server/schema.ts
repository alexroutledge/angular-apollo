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

import {
    makeExecutableSchema,
    addMockFunctionsToSchema,
} from 'graphql-tools';

import { resolvers } from './resolvers';

const typeDefs = `
  type Channel {
    id: ID!                # "!" denotes a required field
    name: String
    messages: [Message]!
  }
  input MessageInput{
    channelId: ID!
    text: String
  }
  type Message {
    id: ID!
    text: String
  }
  # This type specifies the entry points into our API
  type Query {
    channels: [Channel]    # "[]" means this is a list of channels
    channel(id: ID!): Channel,
    allUsers: [User],
    allCourses: [Course],
    course(id: Int!): Course
  }
  # The mutation root type, used to define all mutations
  type Mutation {
    addChannel(name: String!): Channel
    addMessage(message: MessageInput!): Message
  }
  type Subscription {
    messageAdded(channelId: ID!): Message,
    userAdded(channelId: ID!): User
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
  `;

const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };
