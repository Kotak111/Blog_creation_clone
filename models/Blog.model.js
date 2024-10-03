const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogPostSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  image:{
    type:String,
    required:true
  },
  cloudinary_id: {
    type: String,
  },
 
}, {
  timestamps: true
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;
