const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const createToken = (user, secret, expiresIn) => {
  const {
    username,
    email
  } = user;
  return jwt.sign({
    username,
    email
  }, secret, {
    expiresIn
  })
}

module.exports = {
  Query: {
    getCurrentUser: async (_, args, {
      User,
      currentUser
    }) => {
      if (!currentUser) {
        return null
      }
      const user = await User.findOne({
        username: currentUser.username
      }).populate({
        path: 'favorites',
        model: 'Post'
      })
      return user
    },
    getPosts: async (_, args, {
      Post
    }) => {
      const posts = await Post.find({}).sort({
        createdDate: 'desc'
      }).populate({
        path: 'createdBy',
        model: 'User'
      })
      return posts
    },
    getPost: async (_, {
      postId
    }, {
      Post
    }) => {
      const post = await Post.findOne({
        _id: postId
      })
      return post
    },
    infiniteScrollPosts: async (_, {
      pageNum,
      pageSize
    }, {
      Post
    }) => {
      let posts
      if (pageNum === 1) {
        posts = await Post.find({})
          .sort({
            createdDate: 'desc'
          })
          .populate({
            path: 'createdBy',
            model: 'User'
          }).limit(pageSize)
      } else {
        // if the page num is > 1, then how many docs to skip (i.e )
        const skips = pageSize * (pageNum - 1)
        posts = await Post.find({})
          .sort({
            createdDate: 'desc'
          })
          .populate({
            path: 'createdBy',
            model: 'User'
          })
          .skip(skips)
          .limit(pageSize)
      }
      const totalDocs = await Post.countDocuments()
      const hasMore = totalDocs > pageSize * pageNum
      return {
        posts,
        hasMore
      }
    },
  },
  Mutation: {
    addPost: async (_, {
      videoUrl,
      creatorId
    }, {
      Post
    }) => {
      const newPost = await Post({
        videoUrl,
        createdBy: creatorId
      }).save()
      return newPost
    },
    signupUser: async (_, {
      username,
      email,
      password
    }, {
      User
    }) => {
      const user = await User.findOne({
        username
      })
      if (user) {
        throw new Error('User already exists')
      }
      const newUser = await new User({
        username,
        email,
        password
      }).save()
      return {
        token: createToken(newUser, process.env.SECRET, '1hr')
      };
    },
    signinUser: async (_, {
      username,
      password
    }, {
      User
    }) => {
      const user = await User.findOne({
        username
      })
      if (!user) {
        throw new Error("User not Found")
      }
      const isValidPassword = await bcrypt.compare(password, user.password)
      if (!isValidPassword) {
        throw new Error('Invalid Password')
      }
      return {
        token: createToken(user, process.env.SECRET, '1hr')
      }
    },
  }
}