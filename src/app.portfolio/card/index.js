import './index.styl'
import template from './index.pug'
import AnimatedCover from './animatedCover'

/** @ngInject */
export default $document => {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            href: '=',
            image: '='
        },
        template,
        link: (scope, element) => {
            element.ready(() => new AnimatedCover(element, $document))
        }
    }
}
