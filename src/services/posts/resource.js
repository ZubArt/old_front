/** @ngInject */
export default ($resource, appConfig) => {
    return $resource(`${appConfig.api.url}/post/:id`, {
        id: '@_id'
    }, {
        'update': { method:'PUT' },
        'tags': {
            method: 'GET',
            isArray: true,
            url: `${appConfig.api.url}/post/tags`
        },
        'deleteAll': {
            method: 'POST',
            url: `${appConfig.api.url}/post/delete`
        }
    })
}
