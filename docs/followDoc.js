/**
 * @api {post} /follow API to follow other users
 * @apiName follower
 * @apiGroup Follow
 * @apiHeader {String} accessToken users unique accessToken required
 * @apiHeaderExample {json} AuthorizationHeader-Example:
 * {
 * "Authorization":`bearer ${String}`
 * }
 * @apiBody {String} follow user to be followed
 * @apiError InvalidRequestBody This error occurs when user to follow is not provided
 * @apiErrorExample {json} InvalidRequestBodyError-Response:
 * {
 * success:false,
 * message:"Invalid request body"
 * }
 * @apiError userNotFound This error occurs whent he given user is not found in db
 * @apiErrorExample {json} userNotFoundError-Response:
 * {
 * success:false,
 * message:"user not found"
 * }
 * @apiSuccessExample {json} followingSuccessfullySuccess-Response:
 * {
 * success:true,
 * message:"following successfully"
 * }
 * @apiSuccessExample {json} unfollowedSuccessfullySuccess-Response:
 * {
 * sucess:true,
 * message:"unfollowed successfully"
 * }
 * 
 * 
 */ 


 