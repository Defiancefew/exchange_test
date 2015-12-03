export default function(tokenFactory,$state){
  tokenFactory.removeToken();
    $state.go('login');
}