require.config({
    //waitSeconds: 10,
    baseUrl: 'assets/js',
    paths: {
        'jQuery': [
            '//ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min',
            'lib/jquery.min'
        ],
        'underscore': 'lib/underscore-min',
        'backbone': 'lib/backbone-min',
        'modernizr': 'lib/modernizr.min'
    },
    shim: {
        'jQuery': {
            exports: '$'
        },
        'underscore': {
            deps: ['jQuery'],
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jQuery'],
            exports: 'Backbone'
        },
        'modernizr': {
            exports: 'Modernizr'
        }
    }
});
