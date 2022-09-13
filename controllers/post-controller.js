const blog = require('../schema/blogSchema')
const commentsDelete  = require('../controllers/comment-controller')


async function post(req,res,next){
    
    const data = {
        createdBy:req.body.createdBy,
        title:req.body.title,
        description:req.body.description,
        blogData:req.body.blogData
    }
    
    const backend = new blog(data)
    await backend.save()
    
    console.log("this is the middle ware for the blog post ")
    res.send("new post has been created")
} 




async function postDelete(req,res,next){
    console.log("lets see if this working")
    try{

        
        //const blogDelete = await blog.deleteOne({_id:req.body.blogId})
        
        
        console.log('succesfully deleted')
    }
    catch(err){
        console.log(err)
    }
    
    res.send('data')
    //res.send("this deltes post")
    next()
}

async function postUpdate(req,res,next){
    console.log("let's see if this is working")
    try{
        const post =await blog.findById({_id:req.body.postId})
        post.description = req.body.description
        post.blogData = req.body.blogData
        post.save()
        console.log(post)
    }
    catch(err){

    }
    res.send("this is working")
    next()
}

async function getPosts(req,res,next){
    const posts = await blog.find()
    res.send(posts)
}

async function getSinglePost(req,res,next){
    console.log("lets see if this is working")
    const post = await blog.findById({_id:req.params.id})
    const something = "value"
    
    res.send(something)
    
    next()
}

module.exports = {post , postDelete, postUpdate , getPosts , getSinglePost}