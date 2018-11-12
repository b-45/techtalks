![techtalks](https://github.com/b-45/techtalks/blob/master/client/src/assets/techtalks.png)

---

### **techtalks** is a platform for users to share and discover highly engaging technology presentations.

### Commits

---

**Backend**

- [x] install dependencies
- [x] create server.js file
- [x] connect to mongoDB cluster on Atlas
- [x] create [users, posts] models for MONGODB database
  - [x] create user schema
  - [x] create posts schema
- [x] create typeDefs file & graphql schema for apollo server
- [x] create a dedicated file for resolvers & import into server file
- [x] create `signupUser` mutation and resolver (excludes JWT Token)
- [x] create `addPost` mutation and resolver
- [x] create `getPosts` mutation and resolver
      User Authentication (JWT Tokens)
- [x] Hash passwords saved to database
- [x] create `signinUser` mutation and resolver
- [x] create JWT tokens to authenticate user signins
- [x] create `getCurrentUser` & verify JWT token in server
- [x] redirect user to home page after signing in
- [x] create addPost form mutation
- [x] create infinite scroll posts query & resolver
- [x] Re-create data model for mongodb and graphql types, utilize ytdl-getinfo to extract metadata from youtube url
- [x] create fetchMore query to to add more post
- [x] format post titles to titlecase pre save to mongodb
- [x] query video post from backend using postId

**Frontend**

- [x] create & integrate frontend (Vue.js) with backend
  - [x] configure babel, vue router, vue store
  - [x] install tailwind-css
  - [x] remove default component files and views
  - [x] install vue-fontawesome
- [x] create Navbar
  - [x] add hover background on navigation links
- [x] create header-title in home component
  - [x] add css text shake animation to title header
- [x] integrate apollo-boost and vue-apollo for frontend queries
  - [x] test apollo query from frontend
- [x] create dynamic variables to query serve from frontend
  - [x] create SIGNIN_USER mutation
  - [x] create SIGNUP_USER mutation
- [x] add routes & forms for user signin and signup pages
  - [x] modify forms and add css styling
- [x] create action in store to manage user signins (passed test - return token to console)
      Navigations bar state changes
- [x] add profile page
- [x] add logic to change items relevant to user based on authentication state
- [x] add signout button to navigation bar
- [x] create logic to de-authenticate user when signed in
- [x] protect routes that requires authentication and clear token when user sign in
  - [x] protect create post route that requires authentication
- [x] setup alert for graphql errors when authentication fails/ install element UI
- [x] setup validation rules for signin form
- [x] show user notification when signed in
- [x] show user error notification when token expires
- [x] create post user interface
- [x] create a video post route and component
- [ ] build video post in post component
