export default function(loginFactory,$state){
  loginFactory.removeToken();
    $state.go('login');
}