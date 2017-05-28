/** @ngInject */
export default ($resource, appConfig) => {
    return $resource(`${appConfig.api.url}/post/:id`, {
        id: '@id'
    }, {
        'update': { method:'PUT' }
    })
}
