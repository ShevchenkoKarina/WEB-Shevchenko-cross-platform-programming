export const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Lesson {
    id: ID!
    title: String!
    level: String!
    language: String!
    author: User!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    users: [User!]!
    me: User
    lessons: [Lesson!]!
  }

  type Mutation {
    register(name: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    createLesson(title: String!, level: String!, language: String!): Lesson!
    deleteLesson(id: ID!): Boolean!
  }
`;