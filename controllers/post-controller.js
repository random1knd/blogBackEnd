const blog = require('../schema/blogSchema')
const commentsDelete  = require('../controllers/comment-controller')


async function post(req,res,next){
    
    const data = {
        createdBy:req.body.user.name,
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
   
    try{

        if(req.body.blogId.length !=24){
            return res.send("post not found")
        }
        const postCreator = await blog.findOne({_id:req.body.blogId})
        if(postCreator == null){
            return res.send("post not found")
        }
        console.log(postCreator.createdBy)
        console.log(req.body.user.name)
        if(postCreator.createdBy != req.body.user.name)
        {
            return res.send("not authorized")


        }
        
        
        await blog.deleteOne({_id:req.body.blogId})
        return res.send("succefully deleted the post")

    }
    catch(err){
        console.log(err)
    }
    
    //res.send('data')
    //res.send("this deltes post")
    next()
}

async function postUpdate(req,res,next){
    console.log("let's see if this is working postUpdate")
    try{
        if(req.body.postId.length != 24){
            return res.send("not found")
        }
        const post = await blog.findOne({_id:req.body.postId})
        
        if(post == null){
            return res.send("post not found")
        }
        if(post.createdBy != req.body.user.name){
            return res.send("not authorized")
        }
        

        post.blogData = req.body.blogData
        post.title = req.body.title
        post.description = req.body.description

        post.save()
        console.log(post)
        return res.send("post updated successfully")
    }catch(err){
        console.log(err)
    }
    
   
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