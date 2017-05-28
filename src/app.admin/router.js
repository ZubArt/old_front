import './index.styl'
import template from './index.pug'
import controller from './controller'

/** @ngInject */
export default ($stateProvider) => {
    $stateProvider
        .state('app.admin', {
            url: '/admin',
            template,
            controller
        })
}
