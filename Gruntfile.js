// Gruntfile.js
module.exports = function(grunt) {

    grunt.initConfig({

        // JS TASKS ================================================================
        // check all js files for errors
        jshint: {
            all: ['app/scripts/**/*.js']
        },

        // take all the js files and minify them into app.min.js
        uglify: {
            build: {
                files: {
                    'dist/scripts/app.min.js': ['app/scripts/**/*.js', 'app/scripts/*.js']
                }
            }
        },

        // CSS TASKS ===============================================================
        // process the less file to style.css
        less: {
            build: {
                files: {
                    'dist/styles/lolDraft-main.css': 'app/css/style.less'
                }
            }
        },

        // take the processed style.css file and minify
        cssmin: {
            build: {
                files: {
                    '/dist/styles/lolDraft-main.min.css': '/dist/styles/lolDraft-main.css'
                }
            }
        },

        // COOL TASKS ==============================================================
        // watch css and js files and process the above tasks
        watch: {
            css: {
                files: ['/app/css/**/*.less'],
                tasks: ['less', 'cssmin']
            },
            js: {
                files: ['/app/scripts/**/*.js'],
                tasks: ['jshint', 'uglify']
            }
        },

        // watch our node server for changes
        nodemon: {
            dev: {
                script: 'server.js'
            },
            prod: {
                script: 'server.js'
            }
        },

        // run watch and nodemon at the same time
        concurrent: {
            dev:{
                options: {
                    logConcurrentOutput: true
                },
                tasks: ['nodemon:dev', 'watch']
            },
            prod:{
                options: {
                    logConcurrentOutput: true
                },
                tasks: ['nodemon:prod', 'watch']
            }
        },

        copy:{
            prod: {
                files: [
                    {
                        expand: true,
                        dot:true,
                        dest: '/dist',
                        src: [
                            '*.{ico,png,txt}',
                            '.htaccess',
                            //'components/**/*', // should be in dev task, used for non uglified development
                            'static/**/*',

                            'locale/**/*',
                            'images/{,*/}*.{gif,webp,png}',
                            'data/**/*',
                            'fonts/*'
                        ]
                    },
                    //copy the index.html
                    {
                        expand: true,
                        cwd:'app/views/dist',
                        dest: 'dist',
                        src: ['index.html']
                    }
                ]
            },
            dev: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: 'app',
                        dest: 'dist',
                        src: [
                            '*.{ico,png,txt}',
                            '.htaccess',
                            'components/**/*.js', // todo: how to make better? useuseminlist? should be in dev task, used for non uglified development
                            'components/**/*.css', // todo: how to make better? useuseminlist? should be in dev task, used for non uglified development
                            'components/**/*.png', // todo: how to make better? useuseminlist? should be in dev task, used for non uglified development
                            'components/**/*.svg', // todo: how to make better? useuseminlist? should be in dev task, used for non uglified development
                            'components/**/*.ttf', // todo: how to make better? useuseminlist? should be in dev task, used for non uglified development
                            'components/**/*.woff', // todo: how to make better? useuseminlist? should be in dev task, used for non uglified development
                            'components/**/*.map', // todo: how to make better? useuseminlist? should be in dev task, used for non uglified development
                            'scripts/**/*.js',
                            'static/**/*',
                            'locale/**/*',
                            'styles/**/*.css',
                            'styles/**/*.png',
                            'images/{,*/}*.{gif,webp,png}',
                            'fonts/*',
                            'data/**/*.json'
                        ]
                    },
                    //copy the index.html
                    {
                        expand: true,
                        dot:true,
                        cwd:'app/views/dev',
                        dest: 'dist',
                        src: ['index.html']
                    }
                ]
            }
        },

        //config for grunt-contrib-clean
        //used to clean anything out of given directories for a fresh run
        clean: {
            dist: ['dist/**/*'],
            server: ['<%= paths.tmp %>/**/*', '<%=paths.dist %>/**/*',]

        }

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');


    grunt.registerTask('copy-dev', ['clean:dist','copy:dev']);
    grunt.registerTask('copy-prod', ['clean:dist','copy:prod']);
    grunt.registerTask('default', ['less', 'cssmin', 'jshint', 'uglify', 'concurrent']);
    grunt.registerTask('server-dev', ['copy-dev','less','concurrent:dev']);
    grunt.registerTask('server-prod', ['copy-prod','less', 'cssmin', 'uglify', 'concurrent:prod']);
    grunt.registerTask('clean-dist', ['clean:dist']);


};