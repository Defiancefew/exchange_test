export default function (API_URL, $http,tokenFactory) {
    let vm = this;

    vm.apiKeySubmit = false;
    if(!tokenFactory.getApi()){
        vm.apiKey = null;

    }else{
        vm.apiKey = tokenFactory.getApi();
    }



    vm.submit = function () {
        $http.post(API_URL + 'config', {apiKey: vm.apiKey}).success((res)=> {
            console.log(res);
            tokenFactory.setApi(vm.apiKey);
        }).error((err)=> {
            console.log(err);
        })
    }
}