/** @ngInject */
export default ($scope, $document, $mdToast, $mdDialog, PostsResource, AppAdminPostDialog) => {

    const hash = {};
    const assign = items => {
        $scope.items = items || [];

        for (let item of $scope.items) {
            hash[item.id] = item;
        }
    };

    const load = () => new PostsResource.query().$promise
        .then(assign);

    $scope.selected = [];
    $scope.items = [];
    $scope.query = {};
    load();

    Object.assign($scope, {
        edit(targetEvent, item) {
            console.log(targetEvent, item);
            AppAdminPostDialog
                .show({targetEvent, item})
                .then(data => {
                    if (!data)
                        throw new Error('Not changed');
                    return new PostsResource[item ? "update" : "save"](data).$promise
                })
                .then(load)
                .catch(err => {
                    if (err)
                        console.error(err);
                })
        },
        delete(targetEvent, selected) {
            const confirm = $mdDialog.confirm()
                .title('Would you like to delete selected?')
                .textContent('All of the selected items will be deleted.')
                .ariaLabel('Delete items')
                .targetEvent(targetEvent)
                .ok('Yes')
                .cancel('No');
            $mdDialog.show(confirm)
                .then(() => new PostsResource.deleteAll({ids: selected.map(d => d._id)}).$promise)
                .then(() => {
                    $mdToast.showSimple("All data deleted");
                    load();
                    selected.length = 0;
                }, (err) => {
                    if (err) {
                        console.error(err);
                        $mdToast.showSimple(err.message);
                    }
                    load()
                })
        }
    })
}
