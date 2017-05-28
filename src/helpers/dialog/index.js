import __controller from './controller'

export default (template, controller = __controller) => $mdDialog => ({
    show : ({targetEvent, item} = {item: {}}) => $mdDialog.show({
        clickOutsideToClose: false,
        focusOnOpen: false,
        controller,
        targetEvent,
        locals: {
            item
        },
        template: template(),
        fullscreen: true
    })
})