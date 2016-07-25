'use strict';

let gulp = require('gulp'),
    browserify = require('browserify'),
    Config = require('./gulpfile.config'),
    del = require('del'),
    glob = require('glob'),
    exorcist = require('exorcist'), //For extracting sourcemap into separate file
    inject = require('gulp-inject'),
    print = require('gulp-print'), //Prints filenames to the conole
    sourcemaps = require('gulp-sourcemaps'),
    source = require('vinyl-source-stream'), //This plugin streams the supplied files for further pipeline processing
    spsave = require('gulp-spsave'),
    tsc = require('gulp-typescript'),
    tslint = require('gulp-tslint'),
    uglify = require('gulp-uglify'),
    util = require('gulp-util');

import debug from "gulp-debug";

//Save some config settings in a separate JSON file - any sensitive data can thus be separated
const fs = require("fs");
const settings = JSON.parse(fs.readFileSync("../settings.json"));
var config = new Config();
var tscProject = tsc.createProject('tsconfig.json');

/**
 * Lint all custom TypeScript files.
 */
gulp.task('lint-ts', function () {
    return gulp.src([config.allTypeScript])
            //.pipe(print()) //Use to write the script files to the conole during running of task
            .pipe(tslint())
            .pipe(tslint.report('prose'));
});

/**
 * Compile TypeScript and include references to library and app .d.ts files.
 */
gulp.task('compile-ts', ['lint-ts'], function () {
    var sourceTsFiles = [config.allTypeScript,
                         config.allTypeScriptJSX,
                         config.libraryTypeScriptDefinitions];

    var tsResult = gulp.src(sourceTsFiles)
                       .pipe(sourcemaps.init())
                       .pipe(tsc(tscProject));

    tsResult.dts.pipe(gulp.dest(config.sourceJS));
    
    return tsResult.js
                    .pipe(sourcemaps.write('.'))
                    .pipe(gulp.dest(config.sourceJS));
});

/*
 * NOTE browerify-shim is necessary as the sp-pnp-js module uses the namespace pnp,
 * but pnp.js exposes the global object named as $pnp (see package.json for the configuraiton of the shim entry!)  
 * */
gulp.task('package-js', ['include-libsAndPolyfills', 'compile-ts'], function () {

    let bundler =  browserify({
            entries: config.sourceJS + 'spReactTests.js',
            debug: true //This provides sourcemapping
        })  //Initialising browserify
        .external(['react', 'react-dom','sp-pnp-js']); //Removing the external libraries which will be available as <script> tags in the client page  

    bundler.bundle() //start buindling
        .on('error', console.error.bind(console))
        .pipe(exorcist(config.tsOutputPath + '/' + config.bundleFile + '.map')) //Extract the sourcemap to a seprate file
        .pipe(source(config.bundleFile)) // Pass desired output file name to vinyl-source-stream
        .pipe(gulp.dest(config.tsOutputPath)); // Destination for the bundle
})


/**
 * Remove all generated JavaScript files from TypeScript compilation.
 */
gulp.task('clean-ts', function () {
    var typeScriptGenFiles = [
                config.tsOutputPath +'/**/*.js',    // path to all JS files auto gen'd by editor
                config.tsOutputPath +'/**/*.js.map' // path to all sourcemap files auto gen'd by editor
            ];
    del(typeScriptGenFiles);
});

/*
 * Get the vendor JS polyfills to be uploaded 
 * (also any unbundled vendor libraries) 
 */
gulp.task('include-libsAndPolyfills', () => {
    return gulp.src([
            config.allLibraries,
            'node_modules/office-ui-fabric/dist/css/fabric.css',
            'node_modules/office-ui-fabric/dist/css/fabric.components.css',
            'node_modules/react/dist/react.js',
            'node_modules/react-dom/dist/react-dom.js',
            'node_modules/sp-pnp-js/dist/pnp.js',
            'node_modules/whatwg-fetch/fetch.js'])
        //.pipe(print()) //Use to write names of all included files to the console during running of this task
        .pipe(gulp.dest(config.librariesOutputPath));
});

/*
 * Upload ONLY the bundled file to the SharePoint site!
 * NOTE - the username and password must be XML encoded, otherwise the spsave() call will fail with "invalid STS request"
 */
gulp.task('upload-sp', ['package-js'], function () {
    return gulp.src(config.distFilePaths)
        .pipe(print((filepath) => { return `Uploading ${filepath}...` }))
        .pipe(spsave({
            username: settings.username,
            password: settings.password,
            siteUrl: settings.siteUrl,
            folder: "SiteAssets",
            notification: true
        }));
})
/*
 * Upload the bundled file and the libraries to the SharePoint site!
 * NOTE - the username and password must be XML encoded, otherwise the spsave() call will fail with "invalid STS request"
 */
gulp.task('uploadAll-sp', ['package-js'], function () {
    return gulp.src(config.allDistFiles)
        .pipe(print())
        .pipe(spsave({
            username: settings.username,
            password: settings.password,
            siteUrl: settings.siteUrl,
            folder: "SiteAssets",
            notification: true
        }));
})

gulp.task('buildAndUpload', ['package-js', 'upload-sp']);

gulp.task('watch', function() {
    gulp.watch([config.allTypeScript, config.allTypeScriptJSX], ['upload-sp']);
});

gulp.task('default', function () {
    gulp.start('buildAndUpload');
    //gulp.start('watch');
});


/*
gulp.task('include-vendorlibs', function(){
    return gulp.src([
            'node_modules/react/dist/react.js'])
        .pipe(print())
        .pipe(gulp.dest(config.sourceVendorLibs));
});
gulp.task('package-vendorjs', ['include-vendorlibs'], function () {
    const files = glob.sync(config.sourceVendorLibs + '/** /*.js');
    return browserify({
            entries: files,
            debug: false //This removed sourcemapping
        })
        .bundle()
        .on('error', console.error.bind(console))
        //.pipe(debug({title: "Stream contents:", minimal: false}))
        .pipe(source("vendor.js")) // Define the name of the bundle
        .pipe(print())
        .pipe(gulp.dest(config.tsOutputPath)); // Destination for the bundle
})
*/
