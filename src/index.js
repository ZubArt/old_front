import Utils from './utils'
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

const list = [
    //global
    aui, am, ar, at, as
];

// application modules
list.push.apply(
    list,
    // make context for loading all our app modules
    // it is the feature of webpack
    Utils.loadWithDefault(require.context('.', true, /\.\/app\.[a-z]+\/index\.js$/))
);

// application services
import services from './services';
list.push.apply(list, services);

angular.module('app', list)
    .constant('appConfig', config)
    .config(state)
    .config(translate)
    .run(($state, $rootScope) => {
        $rootScope.$state = $state;
        const local = /localhost/.test(document.location.host);
        $state.go(local ? 'app.admin' : 'app.portfolio');
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
