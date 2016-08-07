import '../styles'
import template from './index.jade'

export default ($stateProvider, $urlRouterProvider, $mdThemingProvider) => {
    $stateProvider.state('app', {
        url: '',
        template
    });
    $urlRouterProvider.otherwise('/');

    $mdThemingProvider.theme('succes');
    $mdThemingProvider.theme('error')
}
