//User galti kre toh error show karega
export const errorHandler = (statusCode, message) => {
    const error = new Error(message)// javaScript object(Error constructor)
    error.statusCode = statusCode
    error.message = message
    return error;
}