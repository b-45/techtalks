const { ApolloServer, gql } = require("apollo-server")
const mongoose = require('mongoose')

mongoose
  .connect( 
    'mongodb+srv://bernard:9H2LheEGPvBKV11m@techtalks-kmoya.mongodb.net/test?retryWrites=true',
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
