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
 