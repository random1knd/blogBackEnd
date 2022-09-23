/**
 * @api {post} /adminPosts Fetches posts for the admin which are not approved yet
 * @apiName getPostsAdmin
 * @apiGroup Admin
 * @apiHeader {String} AccessToken users unique accessToken is required and with role admin
 * @apiHeaderExample {json} AuthorizationHeaderExample:
 * {
 * "Authorization":`bearer ${String}`
 * }
 * 
 * @apiError DataBaseError This occurs if something goes wrong at the db while retriving
 * @apiErrorExample {json} DataBaseError-Response:
 * {
 * success:false,
 * message:"something went wrong"
 * }
 * @apiError NotAuthorized This error occurs if the user role is not admin
 * @apiErrorExample {json} NotAuthorizedError-Response:
 * {
 * sucess:false,
 * message:"Not authorized"
 * }
 * @apiSuccessExample {json} PostsSuccess-Response:
 * {
 * success:true,
 * message:"posts",
 * result:[]
 * }
 * 
 * 
 * 
 */ 



/**
 * @api {post} /approve To approve posts
 * @apiName approve
 * @apiGroup Admin
 * @apiBody {String} blogId id of the post
 * @apiError InvalidRequestBody This occurs when blogId is not provided
 * @apiErrorExample {json} InvalidRequestBodyError-Response:
 * {
 * success:false,
 * message:"Invalid request body"
 * }
 * 
 * @apiError postNotFound This error occurs when the given blogId is not present in the db
 * @apiErrorExample {json} PostNotFoundError-Response:
 * {
 * success:false,
 * message:"Post not found"
 * }
 * @apiError DatabaseError This occurs when something goes wrong with db or given is not right
 * @apiErrorExample {json} DataBaseError-Response:
 * {
 * success:false,
 * message:"something went wrong make sure the id is right"
 * }
 * @apiError NotAutrhorized This error occurs when user doesnot have admin role
 * @apiErrorExample {json} NotAuthorizedError-Response:
 * {
 * success:false,
 * message:"Not authorized"
 * }
 * @apiSuccessExample {json} PostSuccessfullyApprovedSuccess-Response:
 * {
 * success:true,
 * message:"Post successfully approved"
 * 
 * }
 * 
 * 
 * 
 */ 
