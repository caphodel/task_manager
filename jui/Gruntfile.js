module.exports = function (grunt) {

	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		size_report: {
	        your_target: {
	            files: {
	                list: ['../assets/js/jui2.ui.min.js', '../assets/js/jui2.lib.min.js', '../assets/js/jui2.tmp.min.js', '../assets/js/jui2.min.js', '../assets/js/css/jui2.min.css']
	            },
	        },
	    },
		concat : {
			options : {
				separator : ';',
				process : function (src, filepath) {
					return '/****' + filepath + '****/\n' + src;
				}
			},
			dist : {
				src : [
					'js/core.js',
					'js/method.js',
					'js/attrChange.js',
					'js/base.js',
					'js/button.js',
					'js/textField.js',
					'js/progressBar.js'
				],
				dest : '../assets/js/<%= pkg.name %>.ui.js'
			},
			lib : {
				src : ['lib/document-register-element.js', 'lib/handlebars.runtime-v3.0.3.js', 'lib/expr-eval.min.js'],
				dest : '../assets/js/<%= pkg.name %>.lib.js'
			},
			css : {
				src : ['../assets/css/jui2.css'],
				dest : '../assets/css/jui2.css'
			}
		},
		uglify : {
			options : {
				banner : '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> Copyright <%= pkg.author %> */\n',
				sourceMap : function (path) {
					return path + ".map";
				}
			},
			dist : {
				files : {
					'../assets/js/<%= pkg.name %>.ui.min.js' : ['<%= concat.dist.dest %>'],
					'../assets/js/jui2.tmp.min.js' : '../assets/js/jui2.tmp.js',
					'../assets/js/jui2.lib.min.js' : '../assets/js/jui2.lib.js'
				}
			}
		},
		jshint : {
			files : ['js/*.js'],
			options : {
				// options here to override JSHint defaults
				globals : {
					jQuery : true,
					console : true,
					module : true,
					document : true
				}
			}
		},
		handlebars : {
			compile : {
				options : {
					namespace : 'jui2.tmpl',
					processName : function (filePath) {
						return filePath.replace(/^template\//, '').replace(/\.hbt$/, '');
					}
				},
				files : {
					"../assets/js/jui2.tmp.js" : ["template/*.hbt"]
				}
			}
		},
		less : {
			production : {
				options : {
					cleancss : true,
					banner : '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> Copyright <%= pkg.author %> */\n'
				},
				files : {
					"../assets/css/jui2.css" : "less/style.less"
				}
			}
		},
		cssmin : {
			minify: {
				options: {
					'report': 'min'
				},
				expand: true,
				cwd: '../assets/css/',
				src: ["jui2.css"],
				dest: '../assets/js/css/',
				ext: '.min.css'
			}
		},
		'ftp-deploy' : {
			gg_05 : {
				auth : {
					host : 'gggmpscdweb05',
					port : 21,
					authKey : 'key1'
				},
				src : 'dist',
				dest : '/rnd/dist'
			},
			gg_new_05 : {
				auth : {
					host : 'gggmpscdweb05',
					port : 21,
					authKey : 'key1'
				},
				src : 'dist',
				dest : '/new/rnd/dist'
			},
			gg_beta_05 : {
				auth : {
					host : 'gggmpscdweb05',
					port : 21,
					authKey : 'key1'
				},
				src : 'dist',
				dest : '/gg_beta/rnd/dist'
			},
			gg_03 : {
				auth : {
					host : 'gggmpscdweb03',
					port : 21,
					authKey : 'key1'
				},
				src : 'dist',
				dest : '/rnd/dist'
			},
			gg_beta_08 : {
				auth : {
					host : 'gggmpscdweb08',
					port : 21,
					authKey : 'key1'
				},
				src : 'dist',
				dest : '/gg_beta/rnd/dist'
			},
			hris : {
				auth : {
					host : '10.216.130.17',
					port : 21,
					authKey : 'key3'
				},
				src : 'dist',
				dest : '/htdocs/rnd/dist'
			}
		},
		jsdoc : {
			dist : {
				src: ['js/*.js'],
				options: {
					destination: 'doc',
					template: "jsdoc/default",
					configure: "conf.json"
				}
			}
		},
		copy: {
			main: {
				files: [
				  {expand: true, src: 'extension/**/*', dest: 'dist/'},
				  {expand: true, src: 'jquery.js', dest: 'dist/'},
					{expand: true, src: 'out/*', dest: 'dist/'}
				]
			}
		},
		compress: {
		  main: {
		    options: {
		      archive: 'jui.zip' // What you want to call your file
		    },
		    files: [
		      {
		        src: ['dist/**'], // What should be included in the zip
		        dest: './'        // Where the zipfile should go
		      },
		      {
		        src: ['dist/out/**'], // What should be included in the zip
		        dest: './'        // Where the zipfile should go
		      },
		      {
		        src: ['dist/css/**'], // What should be included in the zip
		        dest: './'        // Where the zipfile should go
		      },
		      {
		        src: ['css/**'], // What should be included in the zip
		        dest: './dist'        // Where the zipfile should go
		      },
		      {
		        src: ['fonts/**'], // What should be included in the zip
		        dest: './dist'        // Where the zipfile should go
		      }
		    ]
		  }
		},
		'github-release': {
		  options: {
		    repository: 'caphodel/jui',
		    release: {
		      tag_name: grunt.file.readJSON('package.json').version,
		      name: grunt.file.readJSON('package.json').version,
		      body: grunt.file.readJSON('package.json').description
		    }
		  },
		  files: {
		    src: ['jui.zip']
		  }
		},
		prompt: {
			'default':{
		    options: {
					questions: [
	          {
	            config: 'task.runner',
	            type: 'list',
	            message: 'Which task would you like to use?',
	            default: 'compile',
	            choices: ['compile', 'development', 'production', 'release']
	          }
	        ],
					then: function(results, done) {
	          if(results['task.runner']=='compile'){
							grunt.task.run('compile');
						}
	          if(results['task.runner']=='development'){
							grunt.task.run('development');
						}
	          if(results['task.runner']=='production'){
							grunt.task.run('production');
						}
	          if(results['task.runner']=='release'){
							grunt.task.run('release');
						}
	        }
		    }
			},
			'release': {
				options: {
		      questions: [
		        {
		          config: 'github-release.options.auth.user', // set the user to whatever is typed for this question
		          type: 'input',
		          message: 'GitHub username:'
		        },
		        {
		          config: 'github-release.options.auth.password', // set the password to whatever is typed for this question
		          type: 'password',
		          message: 'GitHub password:'
		        }
		      ]
		    }
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-handlebars');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-ftp-deploy');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-prompt');
	grunt.loadNpmTasks('grunt-github-releaser');
	grunt.loadNpmTasks('grunt-jsdoc-ng');
	grunt.loadNpmTasks('grunt-size-report');

	grunt.registerTask('default', ['prompt:default']);
	grunt.registerTask('compile', ['less', 'concat', 'cssmin', 'handlebars', 'uglify', 'copy', 'size_report']);
	grunt.registerTask('development', ['less', 'concat', 'cssmin', 'handlebars', 'uglify', 'copy', 'size_report', 'ftp-deploy:gg_beta_05', 'ftp-deploy:gg_new_05']);
	grunt.registerTask('production', ['less', 'concat', 'cssmin', 'handlebars', 'uglify', 'copy', 'size_report', 'ftp-deploy']);
	grunt.registerTask('release', ['prompt:release', 'less', 'concat', 'cssmin', 'handlebars', 'uglify', 'copy', 'size_report', 'compress'/*, 'github-release'*/]);

};
