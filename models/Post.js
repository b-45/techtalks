const mongoose = require("mongoose")
const { getInfo } = require('ytdl-getinfo')

const PostSchema = new mongoose.Schema({
  videoUrl: {
    type: String,
    required: true
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
  like_ratio: {
    type: Number
  },
  likes:{
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
    this.title = data.items[0].title
    this.duration = data.items[0].duration
    this.thumbnail = data.items[0].thumbnail
    this.like_ratio = Math.floor(data.items[0].like_count/(data.items[0].like_count + data.items[0].dislike_count) * 100)
    next()
})
module.exports = mongoose.model("Post", PostSchema);
