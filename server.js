const { ApolloServer, gql } = require("apollo-server")
const mongoose = require('mongoose')
require("dotenv").config({ path: "variables.env" });

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
const server = new ApolloServer({
  typeDefs,
  playground: {
    endpoint: '/playground',
    settings: {
      'editor.theme': 'light',
      "editor.cursorShape": "block",
    },
  }
});
// Starts the HTTP server listening for connections
server.listen().then(({ url }) => {
  console.log(` 🚀 Server live at  ${url}`);
});
