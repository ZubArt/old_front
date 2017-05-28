import './index.styl'
import dialog from '../../helpers/dialog'
import template from './index.pug'

export default angular
    .module('app.admin.post.dialog', [])
    .service('AppAdminPostDialog', dialog(template))
    .name
