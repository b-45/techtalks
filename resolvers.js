module.exports = {
  // to avoid returning an error, create temporary query property to return null
  Query: {
    getUser: () => null
  },
  Mutation: {
    addPost: async (_, { title, videoUrl, categories, description, host, creatorId }, { Post }) => {
      const newPost = await new Post({
        title,
        videoUrl,
        categories,
        description,
        host,
        createdBy: creatorId
      }).save()
      return newPost
    },
    signupUser: async (_, { username, email, password }, { User }) => {
      const user = await User.findOne({ username })
      if (user) {
        throw new Error('User already exists')
      }
      const newUser = await new User({
        username,
        email,
        password
      }).save()
      return newUser
    }
  }
}