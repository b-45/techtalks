const { ApolloServer, gql } = require("apollo-server")
const mongoose = require('mongoose')
require("dotenv").config({ path: "variables.env" })
const User = require("./models/User")
const Post = require("./models/Post")
const path = require('path')
const fs = require('fs')

// Import typeDefs.gql
const filePath = path.join(__dirname, "typeDefs.gql");
const typeDefs = fs.readFileSync(filePath, "utf-8");

// Connect to MongoDb Atlas cluster
mongoose.connect( process.env.MONGO_URI,
    { 
      useNewUrlParser: true,
    }
  ).then(() => console.log("MongoDB connected"))
   .catch(err => console.error(err));
   mongoose.set('useCreateIndex', true)

// Initialize Apollo/GraphQL Server
const server = new ApolloServer({
  typeDefs,
  context: {
    User,
    Post
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
