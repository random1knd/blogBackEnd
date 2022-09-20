/**
 * @api {post} /like API to like 
 * @apiName liker
 * @apiGroup liker
 * @apiHeader {String} accessToken users unique accessToken Required
 * @apiHeaderExample {json} AuthorizationHeader-Example:
 * {
 * "Authorization":`bearer ${String}`
 * }
 * @apiBody {String} object id of the object to like
 * @apiError InvalidRequestBody This error will occur when the object to like is not provided
 * @apiErrorExample {json} InvalidRequestBodyError-Response:
 * {
 * success:false,
 * message:"Invalid request body"
 * }
 * @apiError commentNotFound This error will occur when the given id is not presesnt in the db
 * @apiErrorExample {json} commentNotFoundError-Response:
 * {
 * success:false,
 * message:"comment not found"
 * }
 * @apiSuccessExample {json} likedSuccess-Response:
 * {
 * sucess:true,
 * message:"liked"
 * }
 * @apieSuccessExample {json} likeDeletedSuccess-Response:
 * {
 * success:true,
 * message:"like deleted"
 * }
 * 
 * 
 * 
 * 
 */ 



/**
 * @api {post} /likes API to fetch likes linked to a comment
 * @apiName likes
 * @apiGroup liker
 * @apiBody {String} commentId id of the comment
 * @apiError InvalidRequestBody This error occurs when commentId is not provided
 * @apiErrorExample {json} InvalidRequestBodyError-Response:
 * {
 * success:false,
 * message:"Invalid request body"
 * }
 * @apiError commentNotFound This error occurs when given commentId is not present in DB
 * @apiErrorExample {json} ObjectNotFoundError-Response:
 * {
 * success:false,
 * message:"object not found"
 * 
 * }
 * @apiError DataBaseError This occurs when something goes wrong with db retrival
 * @apiErrorExample {json} DataBaseError:
 * {
 * success:false,
 * message:"something went wrong make sure the id is right"
 * }
 * @apiSuccessExample {json} likesSuccess:
 * {
 * success:true,
 * message:"likes",
 * result:String
 * }
 * 
 * 
 * 
 * 
 * 
 */ 
