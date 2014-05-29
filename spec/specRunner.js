require.config({
    paths: {
        'jquery': '../public/js/vendor/jquery',
        'jasmine': '../public/js/vendor/jasmine/jasmine',
        'jasmine-html': '../public/js/vendor/jasmine/jasmine-html',
        'spec': '/spec/'
    },
    shim: {
        'jasmine': {
            exports: 'jasmine'
        },
        'jasmine-html': {
            deps: ['jasmine'],
            exports: 'jasmine'
        }
    }
});

require(['jquery', 'jasmine-html'], function($, jasmine) {

    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;

    var htmlReporter = new jasmine.HtmlReporter();

    jasmineEnv.addReporter(htmlReporter);

    jasmineEnv.specFilter = function (spec) {
        return htmlReporter.specFilter(spec);
    };

    var specs = [];
    spec.push('spec/app-spec');

    $(function() {
        require(specs, function(spec) {
            jasmineEnv.execute();
        });
    });

});