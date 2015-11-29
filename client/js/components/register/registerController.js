export default function ($http) {
    let vm = this;

    let url = "http://localhost:3000/register",
        user = {
            email: vm.mail,
            password: vm.password
        };

    vm.submit = function () {
       $http.post(url,user).success((res)=>{
           console.log(res);
       }).error((err)=>{
           console.log(err);
       })
    }
}