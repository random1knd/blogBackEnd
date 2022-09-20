/** 
 * @api {post} /register Request user information
 * @apiName register 
 * @apiGroup Users
 * @apibody {String} user   username of user.
 * @apibody {String} password   password of user.
 * @apibody {String} description    description of user.
 * @apibody {String} email  email of user.
 * @apiError username-is-required   This error will occur when username is not provided
 * @apiErrorExample {json} userRequiredError-Reponse:
 * {
 * success:false,
 * message:"username is required"
 * }
 * @apiError password-is-required   This error will occur when password is not provided or with less than  7 characters
 * @apiErrorExample {json} PasswordIsRequiredError-Reponse:
 * {
 * success:false,
 * message:"password is required and with right length min 7 characters"
 * }
 * @apiError description-is-required    This error will occur when description is not provided
 * @apiErrorExample {json} descriptionIsRequiredError-Reponse:
 * {
 * success:false,
 * message:"description is required"
 * }
 * @apiError email-is-required   This error will occur when email is missing 
 * @apiErrorExample {json} emailIsRequiredError-Response:
 * {
 * success:false,
 * message:"email is required"
 * }
 * @apiError Input-valid-emailId    This error will occur when given email is not valid
 * @apiErrorExample {json} inputValidEmailidError-Response:
 * {
 * success:false,
 * message:"Input valid emailid"
 * }
 * @apiError email-alread-exists    This error will occur when given email already exists in the db
 * @apiErrorExample {json} emailAlreadyExistsError-Reponse:
 * {
 * success:false,
 * message:"email already exists"
 * }
 * @apiError user-could-not-be-created-try-changing-the-user-name   This error will occur when the given username is already present in db 
 * @apieErrorExample {json} userCouldNotBeCreatedError-Response:
 * {
 * success:false,
 * message:"user could not be created try changing the user name"
 * }
 * @apiSuccessExample {json} user has ben created-Response:
 * {
 * success:true,
 * message:"user has been created"
 * 
 * }
 *
 * 
 *   
 */



 /**
  * @api {post} /login User login API
  * @apiName Login
  * @apiGroup Users
  * @apibody {String} user username of the user.
  * @apibody {String} password  password of the user.
  * @apiError both-username-and-password-are-required   This error will occur when user name is not provided
  * @apiErrorExample {json} bothUserNameAndPasswordAreRequiredError-Reponse:
  * {
  * success:false,
  * message:"both username and password are required"
  * }
  * @apiError both-username-and-password-are-required   This error will occur when password is not provided
  * @apiErrorExample {json} bothUserNameAndPasswordAreRequiredError-Reponse:
  * {
  * success:false,
  * message:"both username and password are required"
  * }
  * @apiError username-not-found    This error will occur if given username is not present in db
  * @apiErrorExample {json} usernameNotFoundError-Reponse:
  * {
  * success:false,
  * message:"username not found"
  * }
  * @apiError password-does-not-match   This error will occur when password doesnot match 
  * @apiErrorExample: {json}    passwordDoesNotMatchError-Response:
  * {
  * success:false,
  * message:"password does not match"
  * } 
  * @apiSuccessExample: {json}  loggedIn-Response:
  * {
  * success:true,
  * message:"logged in",
  * accessToken:"accessToken"
  * }
  * 
  * 
  * 
  * 
  * 
  * 
  */
  