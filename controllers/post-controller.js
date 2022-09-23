const blog = require('../schema/blogSchema')
const commentsDelete  = require('../controllers/comment-controller')

//function to post a post 
const post = async (req,res,next) =>{
    
    const {title,description,blogData}  =req.body
    if(!title || title==""){
        return res.status(400).send({success:false,message:"title is required"})
    }
    if(!description || description==""){
        return res.status(400).send({success:false,message:"description is required"})
    }
    if(!blogData || blogData == ""){
        return res.status(400).send({success:false,message:"post information is required"})
    }

    if(title.length > 200 || description.length > 300 || blogData.length > 2000){
        return res.status(400).send({success:false,message:"make sure title - 200 words, description - 300 words ,post - 2000 words"})
    }

    const data = {
        createdBy:req.body.user.name,
        title:title,
        description:description,
        blogData:blogData
    }
    
    const backend = new blog(data)
    await backend.save()
    
    //console.log("this is the middle ware for the blog post ")
    res.status(201).send({success:true,message:"new post has been created"})
    next()
} 



//To delete a post -- /post endpoint with delete as method -- last part of the middleware 
const postDelete = async (req,res,next) =>{
   //console.log("lets see if this is working")
    try{
        
        if(!req.body.blogId){
            return res.status(400).send({success:false,message:"request not valid"})
        }
        
        const postCreator = await blog.findOne({_id:req.body.blogId})
        
          
        if(postCreator == null){
            return res.status(400).send({success:false,message:"post not found"})
        }
        //console.log(postCreator.createdBy)
        //console.log(req.body.user.name)
        if(postCreator.createdBy != req.body.user.name)
        {
            return res.status(403).send({success:false,message:"not authorized"})


        }
        
        
        if(await blog.deleteOne({_id:req.body.blogId})){
        //console.log("error occuers after this")
        //console.log("deleted the post")
        return res.status(200).send({success:true,message:"post deleted successfully"})
    }
        //return res.status(200).send({success:true,message:"succefully deleted the post"})

    }
    catch(err){
        console.log(err)
        return res.status(400).send({success:false,message:"something went wrong make sure the id is right"})
    }
    
    //res.send('data')
    //res.send("this deltes post")
    
}

//To update the post
const postUpdate = async (req,res,next) => {
    //console.log("let's see if this is working postUpdate")
    try{
        if(!req.body.blogId || !req.body.blogData || !req.body.title || !req.body.description){
            return res.status(400).send({success:false,message:"request body not valid"})
        }
        
        const post = await blog.findOne({_id:req.body.blogId})
        
        
           
        
        if(post == null){
            return res.status(404).send({success:false,message:"post not found"})
        }
        //console.log(post.title)
       
        if(post.createdBy != req.body.user.name){
            return res.status(403).send({success:false,message:"not authorized"})
        }

        const {title,blogData,description} = req.body
  
        
        
      
    
        if(title.length > 200 || description.length > 300 || blogData.length > 2000){
            return res.status(400).send({success:false,message:"make sure title - 200 words, description - 300 words ,post - 2000 words"})
        }
    



        post.blogData = blogData
        post.title = title
        post.description = description

        await post.save()
        //console.log(post)
        return res.status(200).send({success:true,message:"post updated successfully"})
    }catch(err){
        console.log(err)
        return res.status(400).send({success:false,message:"something went wrong make sure the id is right"})
    }
    
   
    next()
}

//To get posts for the home page , get's all the posts which are marked approved
const getPosts = async (req,res,next) =>{
    try{
    const posts = await blog.find({status:"Approved"})
    if(posts.length == 0){
        return res.status(404).send({success:true,message:"posts not found"})
    }
    res.status(200).send({success:true,message:"posts",result:posts})
}catch(err){
    console.log(err)
    return res.status(400).send({success:false,message:"something went wrong"})
}
}


//To get single post -- used for reading  as single articles combined with comments and likes -- or can be used for update page to edit the contents
const getSinglePost = async (req,res,next) =>{
    // console.log("lets see if this is working")
    if(!req.params.id){
        return res.staus(400).send({success:false,message:"Invalid request"})
    }
    try{
    const post = await blog.findById({_id:req.params.id})
    if(post == null){
        return res.status(404).send({success:false,message:"post not found"})
    }
    const something = "value"
    
    return res.status(200).send({success:true,message:"post",result:post})
    }catch(err){
        return res.status(400).send({success:true,message:"something went wrong make sure the id is right"})
        console.log(err)
    }
    next()
}

module.exports = {post , postDelete, postUpdate , getPosts , getSinglePost}