const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  preview_image: {
    type: String
  },
  sub_heading: {
    type: String,
    required: true
  },
  featured: Boolean
}, { timestamps: true });

const BlogModel = mongoose.model('Blog', blogSchema);

module.exports = BlogModel;
