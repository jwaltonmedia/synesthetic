module.exports = function(grunt) { //basic format for node files

    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        compass: {
            dist: {
                options: {
                    config: 'public/config.rb',
                    basePath: 'public/'
                }
            }
        },
        cssmin: {
            minify: {
                expand: true,
                cwd: 'public/css/compiled/',
                src: ['*.css', '!*.min.css'],
                dest: 'public/css/compiled/',
                ext: '.min.css'
            }
        },
        imagemin: {
            options: {
                progressive: true,
                pngquant: true
            },
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'public/images/',
                    src: ['**/*.{png,jpg,gif}', '!min/**/*.{png,jpg,gif}'],
                    dest: 'public/images/min'
                }]
            }
        },
        handlebars: {
            options: {
                namespace: 'synth',
                partialsUseNamespace: true,
                processName: function(filePath) {
                    var parts = filePath.split('/'),
                        target = parts[parts.length - 1];
                    return target.split('.')[0];
                },
                compilerOptions: {
                    knownHelpers: {

                    },
                    knownHelpersOnly: false
                },
                amd: true
            },
            compile: {
                files: {
                    'public/js/templates.js': ['views/**/*.hbs']
                }
            }
        },
        jshint: {
            options: {
                '-W099': false,
                ignores: ['public/js/templates.js', 'public/js/partials.js']
            },
            all: ['Gruntfile.js', 'public/js/*.js', 'public/js/views/**/*.js']
        },
        jsbeautifier: {
            files: ['views/data/**/*.json', 'routes/**/*.js', 'public/js/**/*.js', '!public/js/lib/*.js', 'app.js', 'Gruntfile.js']
        },
        uglify: {
            my_target: {
                files: {
                    'public/js/compiled/<%= pkg.name %>.js': ['public/js/compiled/<%= pkg.name %>.js']
                }
            }
        },
        watch: {
            scripts: {
                files: ['public/js/**/*.js', 'Gruntfile.js', '!public/js/vendor/**/*.js', '!public/js/templates.js'],
                tasks: ['jshint', 'jsbeautifier']
            },
            // css: {
            //     files: ['public/sass/*.scss', 'public/sass/lib/*.scss'],
            //     tasks: ['compass']
            // },
            templates: {
                files: ['views/**/*.hbs'],
                tasks: ['handlebars']
            },
            // images: {
            //     files: ['public/images/**/*.{png,jpg,gif}', '!public/images/min/**/*'],
            //     tasks: ['imagemin']
            // },
            all: {
                files: ['Gruntfile.js'],
                tasks: ['default']
            }
        },
        express: {
            options: {
                port: 3000
            },
            dev: {
                options: {
                    script: 'app.js'
                }
            }
        },
        clean: {
            build: {
                src: ['dist/**/*']
            }
        },
        compress: {
            main: {
                options: {
                    archive: '<%= pkg.name %>-dist-<%= grunt.template.today("dd-mm-yyyy") %>.zip',
                    mode: 'zip'
                },
                files: [{
                    cwd: '/public',
                    expand: true,
                    src: ['css/**/*', 'js/**/*', 'html/*.html', 'images/min/**/*'],
                    dest: '/dist'
                }]
            }
        }
    });

    //load tasks 'loadNpmTasks' takes a string argument pertaining to the title of the plugin
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jsbeautifier');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compress');


    //register the tasks!
    grunt.registerTask('default', ['compass', 'handlebars', 'jshint', 'jsbeautifier', 'express:dev', 'watch']);
    grunt.registerTask('dist', ['clean', 'compass', 'cssmin', 'imagemin', 'handlebars', 'uglify', 'clean', 'compress']); //array containig strings referencing tasks defined in the config

};
