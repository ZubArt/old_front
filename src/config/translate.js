(requireContext => {
    return requireContext.keys().map(requireContext);
})(require.context('./po', false, /\.po$/));

/** @ngInject */
export default $translateProvider => {
    $translateProvider
        .useStaticFilesLoader({
            prefix: '../i18n/',
            suffix: '.json'
        })
        .preferredLanguage('ru')
        .registerAvailableLanguageKeys(['en', 'ru'], {
            'en_*': 'en',
            'ru_*': 'ru',
            '*': 'ru'
        })
        .fallbackLanguage('ru')
        //.useLoaderCache(true)
        // .useSanitizeValueStrategy('sanitize')
        .useSanitizeValueStrategy('escaped')
        .determinePreferredLanguage()
    ;
}
