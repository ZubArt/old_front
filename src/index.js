/**
 * CONFIGS
 */
import translate from './config/translate'
import config from './config'
import state from './app'


/**
 * DEPENDENCIES
 *
 * each module after require return name of dependency.
 * it is de facto rule for all npm angular modules.
 *
 * <b>WARNING</b>: All your modules must return name of module
 */
//global
import aui from 'angular-ui-router'
import am from 'angular-material'
import ar from 'angular-resource'
import at from 'angular-translate'
import as from 'angular-sanitize'

//don't need put in list
import 'angular-translate-loader-static-files'

let list = [
    //global
    aui, am, ar, at, as, s
];

angular.module('hub', list)
    .constant('CFG', config)
    .config(state)
    .config(translate)
    .run(($state, $rootScope) => {
        $rootScope.$state = $state;
        $state.go('app.login');
    })
    .directive('autofocus', ($timeout) => {
        return {
            link: (scope, element) => {
                $timeout(function() {
                    element.focus();
                }, 300);
            }
        }
    })
;
