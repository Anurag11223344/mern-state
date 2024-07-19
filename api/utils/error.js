//Insaan galti kre toh error show karega
export const errorHandler = (statusCode, message) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    error.message = message;
    return error;
}