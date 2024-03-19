// DEFINING OUR OWN TYPES
// Exclamation ! means can't be null.

// FIVE BUILT IN SCALAR TYPES FOR GRAPHQL
// int, float, string, boolean, ID

// Query > defines the entry points to the graph for the user

export const typeDefs = `#graphql
  type Game {
    id: ID!
    title: String!
    platform: [String!]!
    reviews: [Review!]
  }
  type Review {
    id: ID!
    rating: Int!
    content: String!
    author: Author!
    game: Game!
  }
  type Author {
    id: ID!
    name: String!
    verified: Boolean!
    reviews: [Review!]
  }
  type Query {
    games: [Game]
    game(id: ID!): Game
    reviews: [Review]
    review(id: ID!): Review
    authors: [Author]
    author(id: ID!): Author
  }
  type Mutation {
    addGame(game: AddGameInput!): Game
    deleteGame(id: ID!): [Game]
  }
  input AddGameInput {
    title: String!,
    platform: [String!]!
  }
`