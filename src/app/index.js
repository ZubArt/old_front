import '../styles'
import template from './index.jade'

/** @ngInject */
export default ($stateProvider, $urlRouterProvider) => {
    $stateProvider.state('app', {
        url: '',
        template
    });
    $urlRouterProvider.otherwise('/');
}
