export default function ($scope,alert) {
    let vm = this;
    vm.info = alert.defineError(vm.type,vm.title,vm.message);
}