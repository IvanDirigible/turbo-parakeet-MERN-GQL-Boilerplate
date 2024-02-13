const typeDefs = `
type User {
  _id: ID
  username: String!
  password: String!
  firstName: String!
  lastName: String!
}

type Query {
  users: [User]
}
`

module.exports = typeDefs