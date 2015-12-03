export default function(tokenFactory){
  return {
      request(config){
          let token = tokenFactory.getToken();

          if(token){
              config.headers.Authorization = 'Bearer ' + token;
          }

          return config;

      },
      response(response){
          return response;
      }
  }
}