requirejs.config({
    baseUrl: 'js',
    deps: ['Init'],
    paths: {
        'Controls': '../Framework/Controls',
        'Core': '../Framework/core'
    },
    map: {
        '*': {
            'css': 'css'
        }
    }
});
