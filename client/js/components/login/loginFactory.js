export default function ($window) {
    let storage = $window.localStorage,
        cachedToken,
        userToken = 'userToken';

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
            storage.removeItem(userToken);
        }
    };
}