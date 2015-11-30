export default function(loginFactory){
  return {
      request(config){
          let token = loginFactory.getToken();

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