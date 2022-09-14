const blog = require('../schema/blogSchema')
const commentsDelete  = require('../controllers/comment-controller')


async function post(req,res,next){
    
    const {title,description,blogData}  =req.body
    if(!title){
        return res.status(400).send("title is required")
    }
    if(!description){
        return res.status(400).send("description is required")
    }
    if(!blogData){
        return res.status(400).send("post information is required")
    }

    if(title.length > 200 || description.length > 300 || blogData.length > 2000){
        return res.status(400).send("make sure title - 200 words, description - 300 words ,post - 2000 words")
    }

    const data = {
        createdBy:req.body.user.name,
        title:title,
        description:description,
        blogData:blogData
    }
    
    const backend = new blog(data)
    await backend.save()
    
    console.log("this is the middle ware for the blog post ")
    res.status(201).send("new post has been created")
    next()
} 




async function postDelete(req,res,next){
   //console.log("lets see if this is working")
    try{
        
        if(!req.body.blogId.length || req.body.blogId.length !=24){
            return res.status(400).send("request not valid")
        }
        const postCreator = await blog.findOne({_id:req.body.blogId})
        if(postCreator == null){
            return res.status(400).send("post not found")
        }
        console.log(postCreator.createdBy)
        console.log(req.body.user.name)
        if(postCreator.createdBy != req.body.user.name)
        {
            return res.status(403).send("not authorized")


        }
        
        
        await blog.deleteOne({_id:req.body.blogId})
        return res.status(200).send("succefully deleted the post")

    }
    catch(err){
        console.log(err)
    }
    
    //res.send('data')
    //res.send("this deltes post")
    next()
}

async function postUpdate(req,res,next){
    //console.log("let's see if this is working postUpdate")
    try{
        if(!req.body.postId || req.body.postId.length != 24){
            return res.status(400).send("reqeuest body not valid")
        }
        const post = await blog.findOne({_id:req.body.postId})
        
        if(post == null){
            return res.status(404).send("post not found")
        }
        if(post.createdBy != req.body.user.name){
            return res.status(403).send("not authorized")
        }
        
        const {title,blogData,description} = req.body

        
      
    
        if(title.length > 200 || description.length > 300 || blogData.length > 2000){
            return res.status(400).send("make sure title - 200 words, description - 300 words ,post - 2000 words")
        }
    



        post.blogData = blogData
        post.title = title
        post.description = description

        post.save()
        console.log(post)
        return res.status(200).send("post updated successfully")
    }catch(err){
        console.log(err)
    }
    
   
    next()
}

async function getPosts(req,res,next){
    const posts = await blog.find()
    if(posts.length == 0){
        return res.status(404).send("posts not found")
    }
    res.status(200).send(posts)
}

async function getSinglePost(req,res,next){
    // console.log("lets see if this is working")
    if(!req.params.id){
        return res.staus(400).send("Invalid request")
    }
    const post = await blog.findById({_id:req.params.id})
    const something = "value"
    
    res.status(200).send(something)
    
    next()
}

module.exports = {post , postDelete, postUpdate , getPosts , getSinglePost}