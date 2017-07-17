function rand(max, min) {
    min = min || 0;
    return (Math.random() * (max - min) + min) | 0;
}

/** @ngInject */
export default ($scope, $document, PostsResource) => {

    let w = $document[0].body.clientWidth;
    let h = $document[0].body.clientHeight;

    const assign = items => {
        $scope.items = items.sort((a,b) => {
            a.__date = a.__date || new Date(a.dateOfProject);
            b.__date = b.__date || new Date(b.dateOfProject);
            return b.__date - a.__date
        });
        items.forEach((item) => {
            console.log(item.dateOfProject);
            item.rs = rand(1, 1);
            item.cs = 1///rand(3, 1);
        })
    };

    const load = () => new PostsResource.query().$promise
        .then(assign);

    $scope.whiteframe = 1;

    const $toolbar = angular.element($document[0].querySelector('#toolbar'));

    angular.element($document[0].querySelector('body')).on('scroll', function() {
        if (this.scrollTop > 56) {
            $toolbar.addClass('md-whiteframe-8dp')
        } else {
            $toolbar.removeClass('md-whiteframe-8dp')
        }
    });

    load();
}
