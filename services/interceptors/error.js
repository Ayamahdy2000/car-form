
 // interceptor to catch errors
const errorInterceptor = error => {
    // check if it's a server error
    if (!error.response) {
      return Promise.reject(error);
    }
    // messages
    switch(error.response.status) {
        case 400:
            
            console.error(error.response.status, error.message);
            // notify.warn('Nothing to display','Data Not Found');
            break;

        case 401: // authentication error, logout the user
            // notify.warn( 'Please login again', 'Session Expired');
            // throw new Error("")
            localStorage.removeItem('token');
            // router.push('/auth');
            break;

        default:
            console.error(error.response.status, error.message);
            // notify.error('Server Error');

    }
    return Promise.reject(error);
}
export default errorInterceptor