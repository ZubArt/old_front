export default ($scope, $mdDialog) => {
    $scope.cancel = $mdDialog.cancel;
    $scope.submit = data => {
        $mdDialog.hide(data);
    }
}