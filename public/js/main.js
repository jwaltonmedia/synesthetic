// Require.js allows us to configure shortcut alias
// There usage will become more apparent further along in the tutorial.
require.config({
    paths: {
        jquery: 'vendor/jquery',
        lodash: 'vendor/lodash',
        backbone: 'vendor/backbone',
        handlebars: 'vendor/handlebars.runtime-v1.3.0'
    },
    shim: {
        jquery: {
            exports: '$'
        },
        lodash: {
            exports: '_'
        },
        backbone: {
            deps: ['jquery', 'lodash'],
            exports: 'Backbone'
        },
        handlebars: {
            exports: 'Handlebars',
            init: function() {
                this.Handlebars = Handlebars;
                return this.Handlebars;
            }
        }
    }
});

// Load our app module and pass it to our definition function
require([
    'app'
], function(App) {

    // The "app" dependency is passed in as "App"
    //no longer a need to add to global namespace!
    // window.App = App;
    App.init();
    //

});
