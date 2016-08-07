(requireContext => {
    return requireContext.keys().map(requireContext);
})(require.context('./po', false, /\.po$/));

export default $translateProvider => {
    $translateProvider
        .useStaticFilesLoader({
            prefix: 'i18n/',
            suffix: '.json'
        })
        .preferredLanguage('en')
        .registerAvailableLanguageKeys(['en', 'fr'], {
            'en_*': 'en',
            'fr_*': 'fr',
            '*': 'en'
        })
        .fallbackLanguage('en')
        //.useLoaderCache(true)
        // .useSanitizeValueStrategy('sanitize')
        .useSanitizeValueStrategy('escaped')
        .determinePreferredLanguage()
    ;
}
