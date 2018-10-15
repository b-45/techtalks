const { ApolloServer, gql } = require("apollo-server")
const mongoose = require('mongoose')
require("dotenv").config({ path: "variables.env" });
const User = require("./models/User");
const Post = require("./models/Post");

// Connect to MongoDb Atlas cluster
mongoose
  .connect( 
    process.env.MONGO_URI,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const typeDefs = gql`
  type Hello {
    greet: String
  }

  type Query {
    greeting: [Hello]
  }
`
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
