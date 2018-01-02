const pixRem = require('pixrem');
const postcssFlexboxfixer = require('postcss-flexboxfixer');
const autoPrefixer = require('autoprefixer');
const mozjpeg = require('imagemin-mozjpeg');
const svgo = require('imagemin-svgo');

module.exports = grunt => {
	grunt.initConfig({
		// pug task
		pug: {
			compile: {
				options: {
					data: {
						debug: true,
					},
					pretty: true,
				},
				files: [
					{
						src: '*.pug',
						cwd: 'src/pug/',
						dest: 'docs',
						expand: true,
						ext: '.html',
					},
				],
			},
		},

		htmlmin: {
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: true,
				},
				files: [
					{
						expand: true,
						cwd: 'docs/',
						src: '*.html',
						dest: 'docs',
					},
				],
			},
			dev: {
				files: [
					{
						expand: true,
						cwd: 'docs/',
						src: '*.html',
						dest: 'docs',
					},
				],
			},
		},

		// sass task
		sass: {
			dist: {
				options: {
					outputStyle: 'expanded',
				},
				files: [
					{
						src: '*.scss',
						cwd: 'src/sass/',
						dest: 'docs/css',
						expand: true,
						ext: '.css',
					},
				],
			},
		},

		postcss: {
			options: {
				map: true,
				processors: [
					pixRem(), // add fallbacks for rem units
					postcssFlexboxfixer,
					autoPrefixer({ browsers: ['last 2 versions', 'ie >= 9'] }), // add vendor prefixes
				],
			},
			dist: {
				src: 'docs/css/application.css',
			},
		},

		// babel
		babel: {
			options: {
				sourceMap: false,
				presets: ['env'],
			},
			dist: {
				files: [
					{
						expand: true,
						cwd: 'src/js/',
						src: ['**/*.js'],
						dest: 'src/_compiled-js',
						ext: '-compiled.js',
					},
				],
			},
		},

		// uglify task (js minify)
		uglify: {
			js: {
				files: {
					'docs/js/pages/index.min.js': [
						'src/_compiled-js/pages/index-compiled.js',
						'src/_compiled-js/components/countdown-clock-compiled.js',
					],
					'docs/js/pages/housing-info-and-policies.min.js': [
						'src/_compiled-js/pages/housing-info-and-policies-compiled.js',
					],
					'docs/js/pages/agenda.min.js': ['src/_compiled-js/pages/agenda-compiled.js'],
					'docs/js/pages/register.min.js': ['src/_compiled-js/pages/register-compiled.js'],
					'docs/js/app.min.js': ['src/_compiled-js/app-compiled.js'],
					'docs/js/components/accordion.min.js': ['src/_compiled-js/components/accordion-compiled.js'],
					'docs/js/components/googleMap-venue.min.js': ['src/_compiled-js/components/googleMap-venue-compiled.js'],
					'docs/js/components/tabs-vertical.min.js': ['src/_compiled-js/components/tabs-vertical-compiled.js'],
					'docs/js/components/tabs-horizontal.min.js': ['src/_compiled-js/components/tabs-horizontal-compiled.js'],
				},
			},
		},

		// copy task (copy src/libraries to docs/libraries)
		copy: {
			main: {
				expand: true,
				cwd: 'src',
				src: ['fonts/**', 'video/**', 'libraries/**'],
				dest: 'docs/',
			},
			favicons: {
				expand: true,
				flatten: true,
				cwd: 'src/images/favicons/',
				src: ['**'],
				dest: 'docs/',
			},
			htaccess: {
				expand: true,
				flatten: true,
				cwd: './',
				src: ['.htaccess'],
				dest: 'docs/',
			},
		},

		// image compress task (compress all image src/images to docs/images)
		imagemin: {
			dynamic: {
				options: {
					svgoPlugins: [
						{ removeViewBox: true }, // don't remove the viewbox atribute from the SVG
						{ removeUselessStrokeAndFill: true }, // don't remove Useless Strokes and Fills
						{ removeEmptyAttrs: true }, // don't remove Empty Attributes from the SVG
					],
					use: [mozjpeg(), svgo()],
				},
				files: [
					{
						expand: true,
						cwd: 'src/',
						src: ['images/**/*.{png,jpg,gif,svg}'],
						dest: 'docs',
					},
				],
			},
		},

		// minify css (only tun in production)
		cssmin: {
			options: {
				report: 'gzip',
			},
			target: {
				files: [
					{
						expand: true,
						cwd: 'docs/css',
						src: ['*.css', '!*.min.css'],
						dest: 'docs/css',
						ext: '.css',
					},
				],
			},
		},

		// auto refresh view on change in dist directory
		browserSync: {
			dev: {
				bsFiles: {
					src: ['docs/**.*'],
				},
				options: {
					watchTask: true,
					server: './docs',
				},
			},
		},

		// Combine Media Queries
		combine_mq: {
			new_filename: {
				options: {
					beautify: true,
				},
				src: 'docs/css/application.css',
				dest: 'docs/css/application.css',
			},
		},

		// watch change inside directory to run task
		watch: {
			pug: {
				files: ['src/pug/**/*.pug'],
				tasks: ['pug', 'htmlmin:dev'],
			},
			sass: {
				files: ['src/sass/**/*.scss'],
				tasks: ['sass', 'postcss'],
			},
			js: {
				files: ['src/js/**/*.js'],
				tasks: ['babel', 'uglify'],
			},
			imagemin: {
				files: ['src/images/**'],
				tasks: ['imagemin'],
			},
		},
	});

	// initial
	grunt.loadNpmTasks('grunt-babel');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-combine-mq');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-pug');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-postcss');

	// register default task
	grunt.registerTask('default', [
		'pug',
		'sass',
		'postcss',
		'combine_mq',
		'babel',
		'uglify',
		'htmlmin:dev',
		'browserSync',
		'watch',
	]);
	grunt.registerTask('build', [
		'pug',
		'sass',
		'postcss',
		'combine_mq',
		'babel',
		'uglify',
		'imagemin',
		'copy',
		'copy:favicons',
		'copy:htaccess',
		'cssmin',
		'htmlmin:dist',
	]);
	grunt.registerTask('build-serve', [
		'pug',
		'sass',
		'postcss',
		'combine_mq',
		'babel',
		'uglify',
		'imagemin',
		'copy',
		'copy:favicons',
		'copy:htaccess',
		'cssmin',
		'htmlmin:dist',
		'browserSync',
		'watch',
	]);
};
