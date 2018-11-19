const mongoose = require("mongoose")
const {
  getInfo
} = require('ytdl-getinfo')

const PostSchema = new mongoose.Schema({
  videoUrl: {
    type: String,
    required: true
  },
  videoId: {
    type: String
  },
  title: {
    type: String,
  },
  duration: {
    type: Number
  },
  thumbnail: {
    type: String
  },
  likeRatio: {
    type: Number
  },
  likes: {
    type: Number,
    default: 0
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
})

PostSchema.pre('save', async function (next) {
  let data = await getInfo(this.videoUrl)
  this.title = data.items[0].title.toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ")
  this.videoId = data.items[0].id
  this.duration = Math.floor(data.items[0].duration / 60)
  this.thumbnail = data.items[0].thumbnail
  this.likeRatio = Math.floor(data.items[0].like_count / (data.items[0].like_count + data.items[0].dislike_count) * 100)
  next()
})

// index to search all fields of post
PostSchema.index({
  '$**': 'text'
})
module.exports = mongoose.model("Post", PostSchema);