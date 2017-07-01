
/** @ngInject */
export default ($scope, $document, PostsResource) => {

    let w = $document[0].body.clientWidth;
    let h = $document[0].body.clientHeight;
    let sq = w * h;
    let ssq = 4e4;

    $scope.data = d3.range(0, sq, ssq).map((item) => {
        let l = 200;
        return {
            style: `width: ${l}px; height: ${l}px`,
            text: 'traym'
        }
    })

}
