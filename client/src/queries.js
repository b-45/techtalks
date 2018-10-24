import { gql } from 'apollo-boost'

// Posts Queries
 

// User Queries
 

 // Posts Mutations 


// User Mutation
export const SIGNIN_USER = gql`
 mutation($username: String! $password: String!){
  signinUser(username:$username, password:$password){
   token
  }
}
`
export const SIGNUP_USER = gql `
mutation($username: String!, $email:String!, $password: String!) {
  signupUser(
    username: $username
    email: $email
    password: $password
  ) {
    token
  }
}
`






