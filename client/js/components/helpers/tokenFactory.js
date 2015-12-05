export default function ($window) {
    let storage = $window.localStorage,
        cachedToken,
        apiToken,
        userToken = 'userToken',
        api = 'apiKey';

    return {
        setToken(token){
            cachedToken = token;
            storage.setItem(userToken, token);
        },
        getToken(){
            if (!cachedToken) {
                cachedToken = storage.getItem(userToken);
            }
            return cachedToken;
        },
        isAuthenticated(){
            return !!this.getToken()
        },
        removeToken(){
            cachedToken = null;
            apiToken = null;
            storage.removeItem(userToken);
            storage.removeItem(api);
        },
        setApi(apiKey){
            apiToken = apiKey;
            storage.setItem(api,apiKey);
        },
        getApi(){
            if(!apiToken){
                apiToken = storage.getItem(api);
            }
            return apiToken;
        }
    };
}