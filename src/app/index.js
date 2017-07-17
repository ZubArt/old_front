import '../styles'
import template from './index.pug'

/** @ngInject */
export default ($stateProvider, $urlRouterProvider, $locationProvider, $mdThemingProvider) => {
    $stateProvider.state('app', {
        url: '',
        template
    });
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);

    $mdThemingProvider.theme('default')
        .dark()
        .accentPalette('light-blue')
    ;
}
