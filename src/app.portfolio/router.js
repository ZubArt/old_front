// import './index.styl'
import template from './index.jade'
import controller from './controller'

/** @ngInject */
export default ($stateProvider) => {
    $stateProvider
        .state('app.portfolio', {
            url: '/portfolio',
            template,
            controller
        })
}
