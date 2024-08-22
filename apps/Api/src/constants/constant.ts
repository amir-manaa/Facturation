export const HTTP_RESPONSE_CODE = {
  SUCCESS_200:      200,
  CREATED_201:      201,
  BAD_REQUEST_400:  400,
  UNAUTHORIZED_401: 401,
  FORBIDDEN_403:    403,
  NOT_FOUND_404:    404,
  SERVER_ERROR_500: 500
}

export const enum HttpStatusCode {
  SUCCESS_200 =       200,
  CREATED_201 =       201,
  BAD_REQUEST_400 =   400,
  UNAUTHORIZED_401 =  401,
  FORBIDDEN_403 =     403,
  NOT_FOUND_404 =     404,
  SERVER_ERROR_500 =  500
}

export const APP_ERROR_MESSAGE = {
  serverError_500:    "Something went wrong, try again later",
  pageNotFound:       "Page not found",
  createdUser_201:    "User created successfully",
  userAlreadyExists:  "User already exists",
  userAuthenticated:  "User Authenticated successfully",
  userReturned:       "User Returned successfully",
  usersReturned:      "Users Returned successfully",
  usersDeleted:       "Users Deleted successfully",
  userDoesntExist:    "Users does not exist",
  invalidCredentials: "Invalid user email or password",
  invalidEmail:       "Enter a valid email address",
  invalidPassword:    "Password length must be greater than 5",
  emptyReqBody:       "The request body cannot be empty",
  accessDenied:       "Access denied"
}