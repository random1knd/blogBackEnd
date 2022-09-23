/**
 * @api {get} /getPosts API to get posts
 * @apiName getPosts
 * @apiGroup Blog
 * @apiError postsNotFound	This error occurs when there are no approved posts
 * @apiErrorExample {json}	postsNotFoundError-Reponse:
 * {
 * success:false,
 * message:"posts not found"
 * }
 * @apiSuccessExample {json} posts-Response:
 * {
 * success:true,
 * message:[]
 * }
 * 
 */ 











/**
 * @api {post} /post	  API to post Posts
 * @apiName	post
 * @apiGroup Blog
 * @apiHeader {String}	accessToken Users unique accesstoken required.
 * @apiHeaderExample {json} Header-Example:
 * {
 * "Authorization":`bearer ${String}`
 * }
 * @apiBody {String} title 	title of the post
 * @apiBody {String} description 	description of the post
 * @apiBody {String} blogData	Information of the post
 * @apiError title-is-required	This error will occur when title is not provided
 * @apiErrorExample {json} titleIsRquiredError-Reponse:
 * {
 * success:false,
 * message:"title is required"
 * }
 * @apiError description-is-required	This error will occur when description is missing
 * @apiErrorExample {json}	descriptionIsRequired-Response:
 * {
 * success:false,
 * message:"description is required"
 * }
 * @apiError post-information-is-required	This error occured when post information is not provided
 * @apiErrorExample {json} postInformationIsRequired-Response:
 * {
 * success:false,
 * message:"post information is required"
 * }
 * @apiError payloadIsGreaterThanLimit 	This error occu when payload given is greater than the limit
 * @apiErrorExample {json} PayloadAboveLimitError-Response:
 * {
 * success:false,
 * message:"make sure title - 200 words , description -300 words, post - 2000 words"
 * 
 * }
 * @apiSuccessExample {json} newPostHasBeenCreated-Reponse:
 * {
 * 
 * success:true,
 * message:"new post has been created"
 * 
 * }
 * 
 *  
 * 
 */
 

 /**
  * @api {put} /post API to udpate posts
  * @apiName postUpdate
  * @apiGroup Blog
  * @apiHeader {String} accessTokens users unique accessToken required.
  * @apiHeaderExample {json} AuthorizationHeader-Example:
  * {
  * "Authorization":`bearer ${String}`
  * 
  * }
  * @apiBody {String} blogId id of the post
  * @apiBody {String} title  title of the blog
  * @apiBody {String}  description of the blog
  * @apiBody {String}  blogData Information of the blog
  * 
  * @apiError requestBodyInvalid	This error will occur when blogId is missing
  * @apiErrorExample {json} requestBodyInvalidError-Response:
  * {
  * success:false,
  * message:"request body invalid"
  * }
  * 
  * @apiError requestBodyInvalid 	This error will occur when blogData is missing
  * @apiErrorExample {json}	requestBodyInvalidError-Response:
  * {
  * success:false,
  * message:"request body invalid"
  * } 
  * @apiError requestBodyInvalid 	This error will occur when title is missing
  * @apiErrorExample {json}	requestBodyInvalidError-Response:
  * {
  * success:false,
  * message:"request body invalid"
  * }
  * @apiError requestBodyInvalid 	This error will occur when description is missing
  * @apiErrorExample {json}	requestBodyInvalidError-Response:
  * {
  * success:false,
  * message:"request body invalid"
  * }
  * @apiError postNotFound  	This error will occur when the post id is not found in the db
  * @apiErrorExample {json}  postNotFoundError-Reponse:
  * {
  * success:false,
  * message:"post not found"
  * }
  * @apiError NotAuthorized This error will occur when the user who is trying to udpate the post is not the same who created the post 
  * @apiErrorExample {json} NotAuthorizedError-Example:
  * {
  * success:false,
  * message:"Not Authorized"
  * }
  * @apiSuccessExample: {json}	postUpdateSuccessfullySuccess-Response:
  * {
  * success;true,
  * message:"post updated successfully"
  * }
  * 
  * 
  * 
  * 
  * 
  */ 


  /**
   * @api {delete} /post API to delete posts
   * @apiName postDelete
   * @apiGroup Blog
   * @apiHeader {String} accessToken  users unique accessToken required
   * @apiHeaderExample {json}	AuthorizationHeader-Example:
   * {
   * "Authorization":`bearer ${String}`
   * }
   * @apiBody {String} blogId id of the post
   * @apiError requestNotValid 	This error will occur when the post Id is not provided
   * @apiErrorExample {json} requestNotValidError-Response:
   * {
   * success:false,
   * message:"request not valid"
   * }
   * @apiError postNotFound 	This error occurs when the given postId is not found in db
   * @apiErrorExample {json}	PostNotFoundError-Response:
   * {
   * success:false,
   * message:"post not found"
   * }
   * @apiError NotAuthorized This error occurs when the user trying to delete the post is not the same who created the post
   * @apiError {json} NotAuthorizedError-Response:
   * {
   * sucess:false,
   * message:"Not Authorized"
   * }
   * @apiSuccessExample {json} postDeleteSuccessfullySuccess-Response:
   * {
   * success:true,
   * message:"post deleted successfully"
   * 
   * }
   * 
   */ 


/**
 * @api {get} /post API to fetch all the posts
 * @apiName getPosts
 * @apiGroup Blog
 * @apiError DataBaseError This error occurs when something goes wrong with database retrival
 * @apiErrorExample {json} DataBaseError-Response:
 * {
 * success:false,
 * message:"something went wrong"
 * }
 * @apiSuccessExample {json} postsSuccess-Response:
 * {
 * success:true,
 * message:"posts"
 * }
 * @apiSuccessExample {json} postsNotFoundSuccess-Response:
 * {
 * success:true,
 * message:"posts not found"
 * 
 * }
 * 
 * 
 * 
 * 
 */  


/**
 * @api {get} /post/:id
 * @apiName getSinglePost
 * @apiGroup Blog
 * @apiParam {String} id id of the post
 * @apiError InvalidRequestBody This error occurs when blogid is not provided
 * @apiErrorExample {json} InvalidRequestBodyError-Response:
 * {
 * success:false,
 * message:"Invalid request body"
 * }
 * @apiError PostNotFound This error occurs when no post is present on given post id 
 * @apiErrorExample {json} PostNotFoundError-Response:
 * {
 * success:false,
 * message:"post not found"
 * }
 * @apiError DatabaseError This error occurs when something goes wrong with the db or if the id given is not right
 * @apiErrorExample {json} DatabaseError-Response:
 * {
 * success:false,
 * message:"something went wrong make sure the id is right"
 * }
 * @apiSuccessExample {json} postSuccess-Response:
 * {
 * success:true,
 * message:"post",
 * result:[]
 * }
 * 
 */