const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')
const User = require('../../models/User')
const Post = require('../../models/Post')


// @route POST api/posts
// @desc Create new Post
// @access private
router.post(
    "/",
    [
      auth,
      [
        check("text", "Post text is Required!").not().isEmpty()
      ],
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
  
      try {
        const user = await User.findById(req.user.id).select('-password');

        const newPost = new Post ({
          text : req.body.text,
          name : user.name,
          avatar : user.avatar,
          user : req.user.id
        });

            await  newPost.save();
            return res.json(newPost)

      } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
      }
    }
  );

// @route GET api/posts/:username
// @desc Get all user Posts (Profile's posts)
// @access private

router.get('/:username', auth, async (req, res) => {
  try {
      
      const posts = await Post.find({name : req.params.username}).sort({ date : -1})
        return res.json(posts)

  } catch (error) {
    console.error(error.message)
    res.status(500).json('Server error')
  }
})


// @route GET api/posts/
// @desc Get all Posts (Dashboard)
// @access private

router.get('/', auth, async (req, res) => {
  try {
      
      const posts = await Post.find().sort({ date : -1})
        return res.json(posts)

  } catch (error) {
    console.error(error.message)
    res.status(500).json('Server error')
  }
})

// @route GET api/posts/post/:id
// @desc Get Post By ID
// @access private

router.get('/post/:id', auth, async (req, res) => {
  try {
      const post = await Post.findById(req.params.id)
        if(!post){
          return res.status(404).json({ msg:'Post Not Found !'})
        }

       res.json(post)

  } catch (error) {
    console.error(error.message)
    if(error.kind === 'ObjectId'){
      return res.status(404).send({ msg:'Post Not Found !'})
    }
    res.status(500).json('Server error')
  }
})

// @route DELETE api/posts/:id
// @desc delete Post By ID
// @access private
router.delete('/:id', auth, async(req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if(!post){
      return res.status(404).json({ msg:'Post Not Found !'})
    }
    if (post.user.toString() !== req.user.id){
      return res.status(401).json({msg :'You are not authorized to delete this post !'})
    }
    post.remove()
    res.json({msg:'Post removed !'})
  } catch (error) {
    console.error(error)
    if(error.kind === 'ObjectId'){
      return res.status(404).send({ msg:'Post Not Found !'})
    }
    res.status(500).send('Error Server')
  }
})

// @route PUT api/posts/like/:id
// @desc like Post By ID
// @access private
router.put('/like/:id', auth, async (req,res) =>{
  try {
    const post = await Post.findById(req.params.id)
    if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
      return res.status(401).json({msg:'You have been liked this post !'})
    }
    post.likes.unshift({user: req.user.id})
    post.save()
    res.json(post.likes)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Error Server')
  }
})

// @route PUT api/posts/unlike/:id
// @desc unlike Post By ID
// @access private
router.put('/unlike/:id', auth, async (req,res) =>{
  try {
    const post = await Post.findById(req.params.id)
    if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
      return res.status(401).json({msg:'This post in not yet liked !'})
    }
    const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id)
    post.likes.splice(removeIndex,1)
    await post.save()
    res.json(post.likes)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Error Server')
  }
})

// @route POST api/posts/comment/:id
// @desc Add comment to post
// @access private
router.post(
  "/comment/:id",
  [
    auth,
    [
      check("text", "Post text is Required!").not().isEmpty()
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id)

      const newComment = {
        text : req.body.text,
        name : user.name,
        avatar : user.avatar,
        user : req.user.id
      };
          post.comments.unshift(newComment)
          await  post.save();
          return res.json(post.comments)

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route DELETE api/posts/comment/:post_id/comment_id
// @desc delete comment from post
// @access private

router.delete('/comment/:post_id/:comment_id', auth, async (req,res) =>{
  try {
    const post = await Post.findById(req.params.post_id)
    const comment = post.comments.find(comment => comment._id.toString() === req.params.comment_id)

    if(!comment){
      return res.status(404).send({msg:'Comment does not exists'})
    }
    else if(comment.user.toString() !== req.user.id) {
      return  res.status(401).send({msg:'You are not authorized !'})
     }
     else{
      const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.params.comment_id)
      post.comments.splice(removeIndex,1)
      await post.save()
      return res.json(post)
     }

    
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }

})


module.exports = router