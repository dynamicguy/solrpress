// Generated on 2014-12-13 using generator-jhipster 1.10.0
'use strict';

var gulp = require('gulp'),
    prefix = require('gulp-autoprefixer'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    angularFilesort = require('gulp-angular-filesort'),
    inject = require('gulp-inject'),
    jade = require('jade'),
    gulpJade = require('gulp-jade'),
    minifyCss = require('gulp-minify-css'),
    usemin = require('gulp-usemin'),
    uglify = require('gulp-uglify'),
    compass = require('gulp-compass'),
    minifyHtml = require('gulp-minify-html'),
    livereload = require('gulp-livereload'),
    imagemin = require('gulp-imagemin'),
    ngAnnotate = require('gulp-ng-annotate'),
    jshint = require('gulp-jshint'),
    rev = require('gulp-rev'),
    connect = require('gulp-connect'),
    proxy = require('proxy-middleware'),
    es = require('event-stream'),
    flatten = require('gulp-flatten'),
    clean = require('gulp-clean'),
    replace = require('gulp-replace');

var karma = require('gulp-karma')({configFile: 'src/test/javascript/karma.conf.js'});

var yeoman = {
    app: require('./bower.json').appPath || 'app',
    dist: 'src/main/webapp/dist/',
    test: 'src/test/javascript/spec/',
    tmp: '.tmp/',
    scss: 'src/main/scss/'
};

gulp.task('coffee', function () {
    return gulp.src(yeoman.app + 'scripts/**/*.coffee')
        .pipe(coffee({bare: true}).on('error', gutil.log))
        .pipe(gulp.dest(yeoman.app + 'scripts/'));
});

gulp.task('jade', function () {
    return gulp.src(yeoman.app + 'scripts/**/*.jade')
        .pipe(gulpJade({
            jade: jade,
            pretty: true
        }))
        .pipe(gulp.dest(yeoman.app + 'scripts/'));
});

gulp.task('clean', function () {
    return gulp.src(yeoman.dist, {read: false}).
        pipe(clean());
});

gulp.task('clean:tmp', function () {
    return gulp.src(yeoman.tmp, {read: false}).
        pipe(clean());
});

gulp.task('test', function () {
    karma.once();
});

gulp.task('copy', ['clean'], function () {
    return es.merge(gulp.src(yeoman.app + 'i18n/**').
            pipe(gulp.dest(yeoman.dist + 'i18n/')),
        gulp.src(yeoman.app + '**/*.{woff,svg,ttf,eot}').
            pipe(flatten()).
            pipe(gulp.dest(yeoman.dist + 'fonts/')));
});

gulp.task('images', function () {
    return gulp.src(yeoman.app + 'images/**').
        pipe(imagemin({optimizationLevel: 5})).
        pipe(gulp.dest(yeoman.dist + 'images'));
});


gulp.task('compass', function () {
    return gulp.src(yeoman.scss + '{,*/}*.scss').
        pipe(compass({
            project: __dirname,
            sass: 'src/main/scss',
            css: 'src/main/webapp/styles',
            generated_images: '.tmp/images/generated',
            image: 'src/main/webapp/images',
            javascript: 'src/main/webapp/scripts',
            font: 'src/main/webapp/styles/fonts',
            import_path: 'src/main/webapp/bower_components',
            relative: false
        })).
        pipe(gulp.dest(yeoman.tmp + 'styles'));
});


gulp.task('styles', [ 'compass'], function () {
    return gulp.src(yeoman.app + '{,*/}*.css').
        pipe(gulp.dest(yeoman.tmp));
});

gulp.task('server', ['watch', 'compass'], function () {
    connect.server(
        {
            root: [yeoman.app, yeoman.tmp],
            port: 9000,
            livereload: true,
            middleware: function (connect, o) {
                return [
                    (function () {
                        var url = require('url');
                        var proxy = require('proxy-middleware');
                        var options = url.parse('http://localhost:8080/api');
                        options.route = '/api';
                        return proxy(options);
                    })(),
                    (function () {
                        var url = require('url');
                        var proxy = require('proxy-middleware');
                        var options = url.parse('http://localhost:8080/health');
                        options.route = '/api-docs';
                        return proxy(options);
                    })(),
                    (function () {
                        var url = require('url');
                        var proxy = require('proxy-middleware');
                        var options = url.parse('http://localhost:8080/configprops');
                        options.route = '/api-docs';
                        return proxy(options);
                    })(),
                    (function () {
                        var url = require('url');
                        var proxy = require('proxy-middleware');
                        var options = url.parse('http://localhost:8080/beans');
                        options.route = '/api-docs';
                        return proxy(options);
                    })(),
                    (function () {
                        var url = require('url');
                        var proxy = require('proxy-middleware');
                        var options = url.parse('http://localhost:8080/api-docs');
                        options.route = '/api-docs';
                        return proxy(options);
                    })(),
                    (function () {
                        var url = require('url');
                        var proxy = require('proxy-middleware');
                        var options = url.parse('http://localhost:8080/metrics');
                        options.route = '/metrics';
                        return proxy(options);
                    })(),
                    (function () {
                        var url = require('url');
                        var proxy = require('proxy-middleware');
                        var options = url.parse('http://localhost:8080/dump');
                        options.route = '/dump';
                        return proxy(options);
                    })()
                ];
            }
        }
    );
});

gulp.task('watch', function () {
    gulp.watch(yeoman.app + 'scripts/**');
    gulp.watch(yeoman.scss, ['compass']);
    gulp.watch('src/images/**', ['images']);
    livereload();
});

gulp.task('server:dist', ['build'], function () {
    connect.server(
        {
            root: [yeoman.dist],
            port: 9000,
            //livereload: true,
            middleware: function (connect, o) {
                return [
                    (function () {
                        var url = require('url');
                        var proxy = require('proxy-middleware');
                        var options = url.parse('http://localhost:8080/api');
                        options.route = '/api';
                        return proxy(options);
                    })(),
                    (function () {
                        var url = require('url');
                        var proxy = require('proxy-middleware');
                        var options = url.parse('http://localhost:8080/metrics');
                        options.route = '/metrics';
                        return proxy(options);
                    })(),
                    (function () {
                        var url = require('url');
                        var proxy = require('proxy-middleware');
                        var options = url.parse('http://localhost:8080/dump');
                        options.route = '/dump';
                        return proxy(options);
                    })(),
                    (function () {
                        var url = require('url');
                        var proxy = require('proxy-middleware');
                        var options = url.parse('http://localhost:8080/api-docs');
                        options.route = '/api-docs';
                        return proxy(options);
                    })()
                ];
            }
        }
    );
});

gulp.task('build', ['clean', 'copy'], function () {
    gulp.run('usemin');
});

gulp.task('usemin', ['images', 'styles'], function () {
    return gulp.src(yeoman.app + '{,views/}*.html').
        pipe(usemin({
            css: [
                prefix.apply(),
                replace(/[0-9a-zA-Z\-_\s\.\/]*\/([a-zA-Z\-_\.0-9]*\.(woff|eot|ttf|svg))/g, '/fonts/$1'),
                //minifyCss(),
                'concat',
                rev()
            ],
            html: [
                minifyHtml({empty: true, conditionals: true})
            ],
            js: [
                ngAnnotate(),
                uglify(),
                'concat',
                rev()
            ]
        })).
        pipe(gulp.dest(yeoman.dist));
});

gulp.task('default', function () {
    gulp.run('test');
    gulp.run('build');
});
