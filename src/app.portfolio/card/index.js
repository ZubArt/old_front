import './index.styl'
import template from './index.pug'
import AnimatedCover from './animatedCover'

/** @ngInject */
export default ($document, $timeout) => {
    return {
        restrict: 'AE',
        transclude: true,
        scope: {
            data: '='
        },
        template,
        link: ($scope, element) => {
            element.ready(() => new AnimatedCover(element, $document, $scope, $timeout))
        }
    }
}
