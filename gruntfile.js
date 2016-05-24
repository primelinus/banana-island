module.exports = function (grunt) {
    grunt.file.defaultEncoding = 'utf8';

    // Load grunt plugins
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.registerTask('default', [
        'watcherCss',
        'jade',
        'connect',
        'watch'
    ]);
    grunt.registerTask('watcherCss', [
        'sass',
        'cssmin'
    ]);

    grunt.initConfig({

         connect: {
            server: {
                options: {
                    open: {
                        target: 'http://localhost:8000/'
                    },
                    port: 8000,
                    hostname: '*'
                }
            }
        },

        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    sourcemap: 'none',
                    'default-encoding': 'utf-8'
                },
                files: [
                    {
                        './css/styles.css': './src/styles.sass'
                    }
                ]
            }
        },

        cssmin: {
            clean: {
                options: {
                    report: 'min'
                },
                files: {
                    './css/styles.css': './css/styles.css'
                }
            }
        },

        jade: {
            compile: {
                files: [
                    {
                        expand: true,
                        cwd: "./jade-files/",
                        src: "*.jade",
                        dest: "./",
                        ext: ".html"
                    }
                ],
                options: {
                    pretty: true
                }
            }
        },

        watch: {
            sass: {
                files: ['./src/**/*.sass'],
                tasks: ['watcherCss']
            },
            jade: {
                files: ['./jade-files/**/*.jade'],
                tasks: ['jade']
            },
            options: {
                livereload: {
                    host: 'localhost',
                    port: 35728
                }
            }
        }
    });
};
