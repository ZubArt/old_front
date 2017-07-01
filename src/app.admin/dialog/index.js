import './index.styl'
import dialog from '../../helpers/dialog'
import template from './index.pug'
import controller from './controller'

export default angular
    .module('app.admin.post.dialog', [])
    .service('AppAdminPostDialog', dialog(template, controller))
    .name
