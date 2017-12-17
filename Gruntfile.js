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
						dest: 'dist',
						expand: true,
						ext: '.html',
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
						dest: 'dist/css',
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
				src: 'dist/css/application.css',
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
			my_target: {
				files: {
					'dist/js/pages/index.min.js': [
						'src/_compiled-js/pages/index-compiled.js',
						'src/_compiled-js/components/countdown-clock-compiled.js',
					],
					'dist/js/pages/housing-info-and-policies.min.js': [
						'src/_compiled-js/pages/housing-info-and-policies-compiled.js',
					],
					'dist/js/pages/agenda.min.js': ['src/_compiled-js/pages/agenda-compiled.js'],
					'dist/js/pages/register.min.js': ['src/_compiled-js/pages/register-compiled.js'],
					'dist/js/app.min.js': ['src/_compiled-js/app-compiled.js'],
					'dist/js/components/accordion.min.js': ['src/_compiled-js/components/accordion-compiled.js'],
					'dist/js/components/googleMap-venue.min.js': ['src/_compiled-js/components/googleMap-venue-compiled.js'],
					'dist/js/components/tabs-vertical.min.js': ['src/_compiled-js/components/tabs-vertical-compiled.js'],
					'dist/js/components/tabs-horizontal.min.js': ['src/_compiled-js/components/tabs-horizontal-compiled.js'],
				},
			},
		},

		// copy task (copy src/libraries to dist/libraries)
		copy: {
			main: {
				expand: true,
				cwd: 'src',
				src: ['libraries/**', 'fonts/**', 'video/**'],
				dest: 'dist/',
			},
		},

		// image compress task (compress all image src/images to dist/images)
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
						dest: 'dist',
					},
				],
			},
		},
		// minify css (only tun in production)
		cssmin: {
			target: {
				files: [
					{
						expand: true,
						cwd: 'dist/css',
						src: ['*.css', '!*.min.css'],
						dest: 'dist/css',
						ext: '.css',
					},
				],
			},
		},
		// auto refresh view on change in dist directory
		browserSync: {
			dev: {
				bsFiles: {
					src: ['dist/**.*'],
				},
				options: {
					watchTask: true,
					server: './dist',
				},
			},
		},

		// watch change inside directory to run task
		watch: {
			pug: {
				files: ['src/pug/**/*.pug'],
				tasks: ['pug'],
			},
			sass: {
				files: ['src/sass/**/*.scss'],
				tasks: ['sass', 'postcss'],
			},
			js: {
				files: ['src/js/**/*.js'],
				tasks: ['babel', 'uglify'],
			},
			copy: {
				files: ['src/libraries/**'],
				tasks: ['copy'],
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
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-pug');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-postcss');

	// register default task
	if (process.env.NODE_ENV === 'production') {
		grunt.registerTask('default', ['pug', 'sass', 'babel', 'uglify', 'copy', 'imagemin', 'cssmin']);
	} else {
		grunt.registerTask('default', ['pug', 'sass', 'postcss', 'babel', 'uglify', 'browserSync', 'watch']);
	}
};
