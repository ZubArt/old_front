export default ($scope, $mdDialog, item) => {
    $scope.item = item;
    $scope.cancel = $mdDialog.cancel;
    $scope.submit = data => {
        $mdDialog.hide(data);
    }
}