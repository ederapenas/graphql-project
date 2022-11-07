const { buildSchema } = require('graphql');

module.exports =  buildSchema(`

type Booking{
    _id: ID!
    event: Event!
    user: User!
    createdAt: String!
    updatedAt: String!
}

type Event{
    _id: ID!
    titulo: String!
    descricao: String!
    preco: Float!
    data: String!
    criador: User!
}

type User{
    _id: ID!
    email: String!
    senha: String
    createdEvents: [Event!]
}

type AuthData{
    userId: ID!
    token: String!
    tokenExpiration: Int!
}

input EventInput{
    titulo:String!
    descricao: String!
    preco: Float!
    data: String!
}

input UserInput{
    email: String!
    senha: String!
}

type RootQuery{
    events: [Event!]!
    bookings: [Booking!]!
    login(email: String!, senha: String!): AuthData!
}

type RootMutation{
    createEvent(eventInput: EventInput): Event
    createUser(userInput: UserInput): User
    bookEvent(eventId: ID!): Booking!
    cancelBooking(bookingId: ID!): Event!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`)