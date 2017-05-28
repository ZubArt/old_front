import router from './router'
import card from './card'

const dependencies = [
    require('angular-ui-router')
];

export default angular
    .module('app.portfolio', dependencies)
    .directive('card', card)
    .config(router)
    .name



