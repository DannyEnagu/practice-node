export const typeDefs = `#graphql
  # Schema Definition for Game Reviews Author API
  type Game {
    id: ID! # Unique Identifier for Game where ID is a scalar type and ! means required
    title: String!
    platform: [String!]! # Array of Strings
    reviews: [Review!] # Nested Relationship => Game has many Reviews
  }
  type Review {
    id: ID!
    rating: Int!
    content: String!
    author: Author!
    game: Game! # Nested Relationship => Review belongs to a Game
  }
  type Author {
    id: ID!
    name: String!
    verified: Boolean!
    reviews: [Review!] # Nested Relationship => Author has many Reviews
  }
  # Query Entry Points to Fetch Data
  type Query {
    games: [Game]
    game(id: ID!): Game
    reviews: [Review]
    review(id: ID!): Review
    authors: [Author]
    author(id: ID!): Author
  }
  # Mutations Entry Points for Adding, Deleting, and Updating Data
  type Mutation {
    addGame(game: AddGameInput!): Game
    deleteGame(id: ID!): [Game]
    updateGame(id: ID!, edits: EditGameInput): Game
  }
  # Input Types for API body
  input AddGameInput {
    title: String!,
    platform: [String!]!
  }
  input EditGameInput {
    title: String,
    platform: [String!]
  }
`