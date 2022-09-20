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


 /**
  * @api {post} /notifications API to fetch posts by followed users
  * @apiName notified
  * @apiGroup Follow
  * @apiHeader {String} accessToken users unique accessToken required
  * @apiHeaderExample {json} AuthorizationHeader-Example:
  * {
  * "Authorization":`bearer ${String}`
  * }
  * @apiError DatabaseError This occurs if something goes wrong with database saving or deleting
  * @apiErrorExample {json} DataBaseError-Response:
  * {
  * success:false,
  * message:"something went wrong"
  * }
  * 
  * 
  * @apiSuccessExample {json} NoNotificationsHereSuccess-Response:
  * {
  * success:true,
  * message:"no notifications here"
  * }
  * @apiSuccessExample {json} NotificationsSuccess-Response:
  * {
  * success:true,
  * message:"notifications"
  * }
  * 
  * 
  * 
  */ 