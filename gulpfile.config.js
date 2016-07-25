'use strict';
var GulpConfig = (function () {
    function gulpConfig() {
        //Got tired of scrolling through all the comments so removed them
        //Don't hurt me AC :-)
        this.source = './src/';
        this.sourceApp = this.source + 'app/';
        this.sourceJS = this.source + 'js/';
        this.sourceLibs = this.source + 'libs/';
        this.sourceVendorLibs = this.source + 'jsvendor';

        this.allJavaScript = [this.source + '/js/**/*.js'];
        this.allLibraries = this.sourceLibs + '/**/*.js';
        this.allTypeScript = this.sourceApp + '**/*.ts';
        this.allTypeScriptJSX = this.sourceApp + '/*.tsx';

        this.dist = './dist/';
        this.htmlOutputPath = this.dist + 'html';
        this.librariesOutputPath = this.dist + 'libs';
        this.tsOutputPath = this.dist + 'js';
        this.vendorOutputPath = this.dist + 'jsvendor';
        this.allDistFiles = [this.dist + '**/*.css',this.dist + '**/*.js'];

        this.bundleFile = 'bundle-spsearchReact-1.js';
        this.distFilePaths = [this.tsOutputPath + '/' + this.bundleFile, this.tsOutputPath + '/' + this.bundleFile + '.map', this.htmlOutputPath + '/spReactSearch.html'];

        this.typings = './typings/';
        this.libraryTypeScriptDefinitions = './typings/**/*.ts';
    }
    return gulpConfig;
})();
module.exports = GulpConfig;
