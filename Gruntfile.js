
// Load Grunt
module.exports = function (grunt) {

	"use strict";

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		copy: {
			build: {
				cwd: 'source',
				src: [ '**' ],
				dest: 'build',
				expand: true
			},
			bower: {
				files: [
					{ cwd: 'bower_components/jquery_lazyload', src: [ 'jquery.lazyload.js' ], dest: 'build/assets/js/lib/', expand: true },
					{ cwd: 'bower_components/jquery/dist', src: [ 'jquery.min.js' ], dest: 'build/assets/js/lib/', expand: true },
					{ cwd: 'bower_components/backbone-amd', src: [ 'backbone-min.js' ], dest: 'build/assets/js/lib/', expand: true },
					{ cwd: 'bower_components/underscore-amd', src: [ 'underscore-min.js' ], dest: 'build/assets/js/lib/', expand: true },
					{ cwd: 'bower_components/respond/dest', src: [ 'respond.min.js' ], dest: 'build/assets/js/lib/', expand: true },
					{ cwd: 'bower_components/html5shiv/dest', src: [ 'html5shiv.min.js' ], dest: 'build/assets/js/lib/', expand: true }
				]
			}
		},

		clean: {
			build: {
				src: [ 'build' ]
			},
			assets: {
				src: [ 'build/assets/js/**/*.js', '!build/assets/js/**/*.min.js', '!build/assets/js/lib/*-min.js', 'build/assets/css/**/*.scss', '!build/assets/css/**/*.css' ]
			},
			cleanupJs: {
				src: [ 'build/assets/js/lib/*.js', 'build/assets/js/common.js*', 'build/assets/js/require-config.js*', '!build/assets/js/lib/*.min.js', '!build/assets/js/lib/*-min.js' ]
			},
			cleanupSass: {
				src: [ 'build/assets/sass' ]
			},
			cleanupFont: {
				src: [ 'build/assets/fonts' ]
			}
		},

		jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
					jQuery: true
				}
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      test: {
        src: ['source/assets/js/**/*.js', '!source/assets/js/**/*.min.js', '!source/assets/js/**/*-min.js']
      }
    },

		uglify: {
			release: {
				options: {
					compress: {
		        drop_console: true
		      }
				},
				files: [{
					expand: true,
					cwd: 'source/assets/js/',
					src: ['*.js'],
					dest: 'build/assets/js/',
					ext: '.js',
					extDot: 'first'
				}],
			},
			releaseRequire: {
				options: {
					compress: {
						drop_console: true
					}
				},
				files: {
	        'build/assets/js/main.js': ['source/assets/js/common.js', 'bower_components/requirejs/require.js', 'source/assets/js/require-config.js']
	      }
	    },
			build: {
				options: {
					sourceMap: true,
					beautify: true,
					mangle: false
				},
				files: [{
					expand: true,
					cwd: 'source/assets/js/',
					src: ['*.js'], 	// ['**/*.js']
					dest: 'build/assets/js/',
					ext: '.js',
					extDot: 'first'
				}],
			},
			buildRequire: {
				options: {
					sourceMap: true,
					beautify: true,
					mangle: false
				},
				files: {
	        'build/assets/js/main.js': ['source/assets/js/common.js', 'bower_components/requirejs/require.js', 'source/assets/js/require-config.js']
	      }
	    }
		},

		sass: {
			release : {
          options: {
              style: 'compressed',
              sourcemap : 'none'
          },
          files: [{
              expand: true,
							cwd: 'source/assets/sass',
							src: ['**/*.scss'],
							dest: 'build/assets/css/',
							ext: '.css'
		      }]
      },
			build : {
          options: {
              style: 'expanded'
          },
          files: [{
              expand: true,
							cwd: 'source/assets/sass',
							src: ['**/*.scss'],
							dest: 'build/assets/css/',
							ext: '.css'
          }]
      }
    },

		imagemin: {
			build: {
				options: {
					optimizationLevel: 7,
					progressive: true
				},
				files: [{
					expand: true,
					cwd: 'source/assets/img',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'build/assets/img'
				}]
			}
		},

		svg2png: {
			build: {
				files: [{
					cwd: 'source/assets/img/',
					src: ['**/*.svg'],
					dest: 'build/assets/img'
				}]
			}
		},

		sprite: {
			build: {
				src: 'source/assets/img/sprites/*.png',
				dest: 'build/assets/img/sprites/sprites.png',
				destCss: 'build/assets/css/sprites.css'
			}
		},

		fontoptim: {
		    ptserif: {
		        src: 'source/assets/fonts/PTSerif-*',
		        dest: 'build/assets/css/ptserif',
		        options: {
		            fontFamily: 'PT Serif'
		        }
		    }
		},

		watch: {
			gruntfile: {
				options: {
					spawn: false,
					reload: true
				},
				files: [ '<%= jshint.gruntfile.src %>' ],
				tasks: [ 'jshint:gruntfile' ]
			},
			sass: {
				files: [ 'source/assets/sass/**/*.scss' ],
				tasks: [ 'newer:sass:build', 'clean:cleanupSass' ]
			},
			concat: {
				files: [ 'source/assets/js/require-config.js', 'source/assets/js/common.js' ],
				tasks: [ 'newer:uglify:buildRequire' ]
			},
			js: {
				files: [ 'source/assets/js/**/*.js', '!source/assets/js/require-config.js', '!source/assets/js/common.js' ],
				tasks: [ 'newer:uglify:build' ]
			},
			html: {
				files: [ 'source/**/*.{html,php}' ],
				tasks: [ 'newer:copy' ]
			},
			svg2png: {
				files: [ 'source/assets/img/**/*.svg' ],
				tasks: [ 'newer:svg2png' ]
			}
		},

		connect: {
			server: {
				options: {
					open: true,
					port: 4000,
					base: 'build',
					hostname: '*'
				}
			}
		}

	});

	// Load Grunt plugins
	require('load-grunt-tasks')(grunt);

	// Register Grunt tasks
	grunt.registerTask('imagesRelease', [ 'imagemin', 'sprite', 'svg2png' ]);
	grunt.registerTask('imagesBuild', [ 'sprite', 'svg2png' ]);

	grunt.registerTask('buildAssets', [ 'clean:assets', 'copy:bower', 'uglify:build', 'uglify:buildRequire', 'sass:build', 'imagesBuild', 'fontoptim' ]);
	grunt.registerTask('build', [ 'clean:build', 'copy:build', 'buildAssets', 'clean:cleanupJs', 'clean:cleanupSass', 'clean:cleanupFont' ]);

	grunt.registerTask('release', [ 'clean', 'copy:build', 'clean:assets', 'copy:bower', 'uglify:release', 'uglify:releaseRequire', 'sass:release', 'clean:cleanupJs', 'clean:cleanupSass', 'clean:cleanupFont', 'imagesRelease' ]);
	grunt.registerTask('default', [ 'develop' ]);
	grunt.registerTask('develop', [ 'build', 'connect', 'watch' ]);

	grunt.registerTask('test', [ 'copy:bower' ]);

};
