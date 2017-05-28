import router from './router'
import dialog from './dialog'

const dependencies = [
    dialog,
    require('angular-ui-router'),
    require('angular-material-data-table')
];

export default angular
    .module('app.admin', dependencies)
    .config(router)
    .name