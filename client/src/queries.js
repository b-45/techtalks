import {
  gql
} from 'apollo-boost'

// Posts Queries

export const INFINITE_SCROLL_POSTS = gql `
  query($pageNum: Int!, $pageSize: Int!){
    infiniteScrollPosts(pageNum: $pageNum, pageSize:$pageSize){
      hasMore
      posts {
        _id
        videoUrl
        title
        duration
        thumbnail
        likeRatio
        likes
        createdDate
        createdBy {
          _id
          avatar
          username
        }
      }
    }
  }
`

export const GET_POST = gql `
  query($postId: ID!){
    getPost(postId: $postId){
      _id
      videoUrl
      title
      
    }
  }


`


// User Queries
export const GET_CURRENT_USER = gql `
  query{
    getCurrentUser{
      _id
      username  
      email
      password
      avatar
      joinDate
      favorites{
        _id
        title
        videoUrl
      }
    }
  }
`


// Posts Mutations 
export const ADD_POST = gql `
  mutation(
  $videoUrl: String!  
  $creatorId: ID!
) {
  addPost(
    videoUrl: $videoUrl
    creatorId: $creatorId
  ) {
    _id
    videoUrl
    title
    duration
    thumbnail
    likeRatio
  }
}
 `

// User Mutation
export const SIGNIN_USER = gql `
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