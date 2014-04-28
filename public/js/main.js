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

    // var arr = [{
    //     h: 2,
    //     s: 4,
    //     l: 5
    // }, {
    //     h: 2,
    //     s: 6,
    //     l: 7
    // }, {
    //     h: 1,
    //     s: 9,
    //     l: 10
    // }];

    // function handleWind(windStrength) {
    //     var distance = 0;
    //     var fallenTrees = [];
    //     for (var i = 0, j = arr.length; i < j; i++) {
    //         var tree = arr[i];
    //         if (distance && distance >= tree.l || tree.s <= windStrength) {
    //             distance = tree.l + tree.h;
    //             fallenTrees.push(tree);
    //         }
    //     }
    //     return fallenTrees;
    // }

    // console.log(handleWind(4));
    // //

});
