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