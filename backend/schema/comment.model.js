const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
      lowercase:true,
    },
    post:[{
      type: mongoose.Schema.Types.ObjectId,
      ref:'listing',
    }],
    like_comment:[{
      type: mongoose.Schema.Types.ObjectId,
      ref:'signup',
    }],
    commentedby: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'signup',
      required:true,
    },
  },
  { timestamps: true }
);

const commentModel = mongoose.model("comment", commentSchema);
module.exports = commentModel;