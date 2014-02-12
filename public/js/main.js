// Require.js allows us to configure shortcut alias
// There usage will become more apparent further along in the tutorial.
require.config({
    paths: {
        // jquery: 'lib/jquery-1.10.2',
        // lodash: 'lib/lodash-2.4.1',
        // backbone: 'lib/backbone-1.1',
        // marionette: 'lib/marionette-1.6.2',
        // handlebars: 'lib/handlebars.runtime-v1.3.0'
        // text: 'libs/require/text'
    },
    shim: {
        // jquery: {
        //     exports: '$'
        // },
        // lodash: {
        //     exports: '_'
        // },
        // backbone: {
        //     deps: ['jquery', 'lodash'],
        //     exports: 'Backbone'
        // },
        // marionette: {
        //     deps: ['backbone'],
        //     exports: 'Marionette'
        // },
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

    //

});
