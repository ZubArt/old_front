/** @ngInject */
export default ($scope, $document, $mdToast, PostsResource, AppAdminPostDialog) => {

    const hash = {};
    const assign = items => {
        $scope.items = items || [];

        for (let item of $scope.items) {
            hash[item.id] = item;
        }
    };

    const load = () => new PostsResource.query().$promise
        .then(assign);

    $scope.items = [];
    load();

    Object.assign($scope, {
        edit(targetEvent, item) {
            AppAdminPostDialog
                .show({targetEvent, item})
                .then(data => new PostsResource[item ? "update" : "save"](data).$promise)
                .then(load)
                .catch(err => {
                    console.log(err);
                })
        }
    })
}
