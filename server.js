const { ApolloServer, AuthenticationError } = require("apollo-server")
const mongoose = require('mongoose')
const path = require('path')
const fs = require('fs')
const User = require("./models/User")
const Post = require("./models/Post")
require("dotenv").config({ path: "variables.env" })
const jwt = require('jsonwebtoken')

// Import typeDefs.gql & resolver.js
const filePath = path.join(__dirname, "typeDefs.gql")
const typeDefs = fs.readFileSync(filePath, "utf-8")
const resolvers = require('./resolvers')

// Connect to MongoDb Atlas cluster
mongoose.connect( process.env.MONGO_URI,
    { useNewUrlParser: true, }
  ).then(() => console.log("MongoDB connected"))
   .catch(err => console.error(err));
   mongoose.set('useCreateIndex', true)

// Verify JWT Token passed from client
const getUser = async token => {
  if(token) {
    try {
      return await jwt.verify(token, process.env.SECRET)
    } catch(err) {
        throw new AuthenticationError('Your session has ended. Please sign in again')
    }
  }
}

// Initialize Apollo/GraphQL Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers["authorization"]
      return { User, Post, currentUser: await getUser(token)}  
  },
  playground: {
    endpoint: '/playground',
    settings: {
      'editor.theme': 'light',
      "editor.cursorShape": "block",
    },
  }
});

// Start the HTTP server to listen for connections
server.listen().then(({ url }) => {
  console.log(` 🚀 Server live at  ${url}`);
});
