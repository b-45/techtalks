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
      videoId
      title
      likes
      
    }
  }
`

export const SEARCH_POSTS = gql `
  query($searchTerm: String) {
    searchPosts(searchTerm: $searchTerm) {
      _id
      title
      videoUrl
      likes
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

export const LIKE_POST = gql `
mutation($postId: ID!, $username: String!) {
  likePost(postId: $postId, username: $username) {
    likes
    favorites {
      _id
      title
      videoUrl
      videoId
    }
  }
}
`

export const UNLIKE_POST = gql `
mutation($postId: ID!, $username: String!) {
  unlikePost(postId: $postId, username: $username) {
    likes
    favorites {
      _id
      title
      videoUrl
      videoId
    }
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