const getAuthToken = '3%o8i}_;3D4bF]G5@22r2)Et1&mLJ4?$@+16'

export default function authInterceptor(config){
    config.headers['private-key'] = getAuthToken;
    return config;
}
