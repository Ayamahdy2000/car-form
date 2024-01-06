// Interceptor for responses
const responseInterceptor = response => {
    switch(response.status) {
        case 200: 
            // yay!
            break;
        // any other cases
        default:
            // default case
    }
    return response;
}

export default responseInterceptor