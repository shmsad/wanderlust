const express = require('express');
const router = express.Router();
const isVerifyUser = require('../middleware/isVerifyUser');
const listingModel = require('../schema/listing.model');
const ratingModel = require('../schema/rating.model');
// const ratingModel = require("../schema/rating.model");

router.post('/add/:listId', isVerifyUser, async(req, res)=>{
    const {listId} = req.params;
    const {star, text} = req.body;
    console.log(listId, star, text)

   try {
    const post = await listingModel.findById(listId);
    if(!post){
        return res.status(404).json({
            success: false,
            message: "post not found",
        })
    }
    console.log(post)

    let isRating = await ratingModel.findOne({
        post: listId,
        ratedby: req.user,
    });
    console.log(isRating);
    if (isRating) {
      return res.status(400).json({
        success: false,
        message: "You have already rated this post",
      });
    }
    isRating = await ratingModel.create({
      star,
      text,
      post: listId,
      ratedby: req.user,
    });
    console.log(isRating._id);
    post.rating.push(isRating._id);
    const updatedPost = await post.save();
    res.status(200).json({
      success: true,
      message: "rating added successfully",
      post: updatedPost,
    });

   } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
   }
})

router.put('/update', isVerifyUser, async(req, res)=>{})

router.delete('/delete', isVerifyUser, async(req, res)=>{})

module.exports = router;
