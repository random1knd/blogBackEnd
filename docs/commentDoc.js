/**
 * @api {post} /comment API to post comments
 * @apiName comment
 * @apiGroup Comments
 * @apiHeader {String} accessToken users unique accessToken required
 * @apiHeaderExample {json} AuthorizationHeader-Example:
 * {
 * "Authorization":`bearer ${String}`
 * }
 * @apiBody {String} blogId Id of the post
 * @apiBody {String} comment Body of the comment
 * @apiError blogIdIsRequired This error will occur when blogId is not provided
 * @apiErrorExample {json} blogIdIsRequiredError-Response:
 * {
 * success:false,
 * message:"blog Id is required"
 * }
 * @apiError commentIsRequired 	This error will occur when comment body is not provided
 * @apiErrorExample {json} commentRequiredError-Response:
 * {
 * success:false,
 * message:"comment is required"
 * }
 * @apiError payloadLimit	This error will occur when payload limit is crossed
 * @apiErrorExample {json}  payloadError-Response:
 * {
 * success:false,
 * message:"comment can't be more than 300 words"
 * 
 * }
 * @apiError postNotFound This error will occur when given post id is not present in the db
 * @apiErrorExample {json} postNotFoundExample-Response:
 * {
 * success:false,
 * message:"post not found"
 * 
 * }
 * @apiSuccessExample {json} commentSuccessFullyCreatedSuccess-Response:
 * {
 * success:true,
 * message:"comment successfully created"
 * }
 * 
 * 
 * 
 * 
 * 
 */ 

 /**
  * @api {put} /post API to update comment
  * @apiName commentUpdate
  * @apiGroup Comments
  * @apiHeader {String} accessToken users unique accessToken required
  * @apiHeaderExample {json} AuthorizationHeader-Example:
  * {
  * "Authorization":`bearer ${String}`
  * }
  * @apiBody {String} commentId Id of the comment
  * @apiBody {String} comment Body of the comment
  * @apiError RequestBodyInvalid This error will occur when commentId is not provided
  * @apiErrorExample {json} RequestBodyInvalidError-Response:
  * {
  * success:false,
  * message:"Request body Invalid"
  * } 
  * @apiError RequestBodyInvalid This error will occur when comment body is not provided
  * @apiErrorExample {json} RequestBodyInvalidError-Response:
  * {
  * success:false,
  * message:"Request body Invalid"
  * }
  * @apiError commentNotFound This error will occur when the comment is not found in db
  * @apiErrorExample {json} commentNotFoundError-Response:
  * {
  * success:false,
  * message:"comment not found"
  * }
  * @apiSucessExample {json} commentSuccessFullyUpdateSuccess-Response:
  * {
  * success:true,
  * message:"comment successfully updated"
  * }
  * 
  * 
  * 
  */ 

  /**
   * @api {delete} /post API to delete post
   * @apiName commentDelete
   * @apiGroup Comments
   * @apiHeader {String} accessToken users unique accessToken required
   * @apiHeaderExample {json} AuthorizationHeader-Example:
   * {
   * "Authorization":`bearer ${String}`
   * }
   * @apiBody {String} commentId Id of the comment
   * @apiError InvalidRequestBody This error will occur if commentId is not provided
   * @apiErrorExample {json} InvalidRequestBodyError-Response:
   * {
   * success:false,
   * message:"Invalid request body" 
   * }
   * @apiError CommentNotFound This error will occur when the given comment is not found in db
   * @apiErroExample {json} CommentNotFoundError-Response:
   * {
   * success:false,
   * message:"comment not found"
   * }
   * @apiSuccessExample {json} commentSuccessfullyDeleteSuccess-Response:
   * {
   * success:false,
   * message:"comment successfully deleted"
   * }
   * 
   */ 



/**
 * @api {post} /comments API to fetch comments linked to a post
 * @apiName comments
 * @apiGroup Comments
 * @apiBody {String} blogId id of the blog
 * @apiError requestBodyInvalid This error occurs when the blogId is not provided
 * @apiErrorExample {json} requestBodyInvalidError-Response:
 * {
 * success:false,
 * message:"request body invalid"
 * }
 * @apiError DatabaseError This error occurs if something goes wrong at the database retrival
 * @apiErrorExample {json} DataBaseErrr-Response:
 * {
 * success:false,
 * message:"something went wrong make sure the id is right"
 * }
 * @apiSuccessExample {json} NoCommentsFoundSuccess-Response:
 * {
 * success:true,
 * message:"No comments found"
 * }
 * @apiSuccessExample {json} commentsSuccess-Response:
 * {
 * success:true,
 * message:"comments"
 * }
 * 
 * 
 */ 