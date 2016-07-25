(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var sp_pnp_js_1 = (typeof window !== "undefined" ? window['$pnp'] : typeof global !== "undefined" ? global['$pnp'] : null);
var AppHeader = (function (_super) {
    __extends(AppHeader, _super);
    function AppHeader() {
        var _this = this;
        _super.call(this);
        this.state = {
            siteTitle: "(getting...)"
        };
        //Reading from the _spPageContextInfo object
        this.myLoginName = _spPageContextInfo.userLoginName;
        //Call PnP to get title for this web
        sp_pnp_js_1.default.sp.web.select("Title").get()
            .then(function (data) { _this.setState({ siteTitle: data.Title }); });
    }
    AppHeader.prototype.render = function () {
        return React.createElement("header", null, React.createElement("h1", {className: "ms-bgColor-teal"}, "This is a React Search Component"), React.createElement("div", null, "Uses Typescript, React, Office UI Fabric and the PnP cor library."), React.createElement("div", null, "Built in Visual Studio Code using Gulp and Browserify"), React.createElement("div", null, "Welcome, ", this.myLoginName, ", to ", this.state.siteTitle));
    };
    return AppHeader;
}(React.Component));
exports.AppHeader = AppHeader;



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],2:[function(require,module,exports){
(function (global){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var SearchResult = (function (_super) {
    __extends(SearchResult, _super);
    function SearchResult(props) {
        _super.call(this, props);
    }
    SearchResult.prototype.render = function () {
        return React.createElement("li", {className: "ms-ListItem"}, React.createElement("i", {className: "ms-Icon ms-Icon--circleEmpty", style: "float:left;"}), React.createElement("span", {className: "ms-ListItem-primaryText"}, this.props.result.Title), " entered by ", this.props.result.Author, " (content class: ", this.props.result.contentclass, ")");
    };
    return SearchResult;
}(React.Component));
exports.SearchResult = SearchResult;



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],3:[function(require,module,exports){
(function (global){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var sp_pnp_js_1 = (typeof window !== "undefined" ? window['$pnp'] : typeof global !== "undefined" ? global['$pnp'] : null);
var searchResult_1 = require("./searchResult");
var SearchResults = (function (_super) {
    __extends(SearchResults, _super);
    function SearchResults(props) {
        var _this = this;
        _super.call(this, props);
        this.searchTextChanged = function (e) {
            console.log("searchTextChanged");
            _this.setState({
                loading: false,
                query: e.target.value,
                results: _this.state.results,
                resultCount: _this.state.resultCount
            });
        };
        this.submitSearch = function () {
            console.log("Searching on '" + _this.state.query + "'");
            _this.setState({
                loading: true,
                query: _this.state.query,
                results: [],
                resultCount: 0
            });
            console.log(" ..adjusted state");
            sp_pnp_js_1.default.sp.search({
                Querytext: _this.state.query,
                RowLimit: 5
            })
                .then(function (data) {
                console.log("  - got search results");
                if (typeof data !== 'undefined' && typeof data["PrimarySearchResults"] !== 'undefined') {
                    //setState does not immediately change the state, but creates a pending state transition
                    _this.setState({
                        loading: false,
                        query: _this.state.query,
                        results: data["PrimarySearchResults"],
                        resultCount: data["PrimarySearchResults"].length
                    });
                }
            })
                .catch(function (e) { console.log("Error: " + e.message); });
        };
        console.log("constructor");
        this.state = {
            loading: false,
            query: this.props.query,
            results: [],
            resultCount: 0
        };
        this.submitSearch();
    }
    SearchResults.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        console.log("shouldComponentUpdate");
        return (nextState.resultCount !== this.state.resultCount ||
            nextState.results !== this.state.results ||
            nextState.loading !== this.state.loading);
    };
    SearchResults.prototype.renderSpinner = function () {
        console.log("renderSpinner(): " + this.state.loading);
        if (!this.state.loading) {
            return null;
        }
        return React.createElement("div", {className: "ms-Spinner", style: "position:absolute;"});
    };
    SearchResults.prototype.render = function () {
        //Each dynamic child needs to have a unique key (see https://fb.me/react-warning-keys)
        //  and http://blog.arkency.com/2014/10/react-dot-js-and-dynamic-children-why-the-keys-are-important/
        var resultItems = this.state.results.map(function (result, i, a) {
            return (React.createElement(searchResult_1.SearchResult, {key: result.DocId, result: result}));
        }, this);
        //Note - the dynamic element properties DO NOT HAVE SURROUNDING QUOTES
        //Note - the .bind(this) method call COULD be added to the onclick handler so that the instnace context is available in that handler
        //          (without the bind call, the handler is unable to access this.props and this.state)
        //      However, in this case the handler is defined using an arrow function, so "this" is available
        return React.createElement("div", null, React.createElement("div", {className: "ms-TextField"}, React.createElement("label", {className: "ms-Label"}, "Search text"), React.createElement("input", {type: "text", className: "ms-TextField-field", defaultValue: this.props.query, onChange: this.searchTextChanged})), React.createElement("input", {type: "button", value: "Search", onClick: this.submitSearch}), this.renderSpinner(), React.createElement("div", {className: "ms-borderColor-tealLight"}, "Found ", this.state.resultCount, " results for search term \"", this.state.query, "\":"), React.createElement("ul", {className: "ms-List"}, resultItems));
    };
    return SearchResults;
}(React.Component));
exports.SearchResults = SearchResults;



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./searchResult":2}],4:[function(require,module,exports){
(function (global){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactDOM = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);
var AppHeader_1 = require("./AppHeader");
var searchResults_1 = require("./searchResults");
window.onload = function () {
    ReactDOM.render(React.createElement(ReactTests, null), document.getElementById("reactContent"));
};
var ReactTests = (function (_super) {
    __extends(ReactTests, _super);
    function ReactTests(props) {
        _super.call(this, props);
    }
    ReactTests.prototype.render = function () {
        return React.createElement("article", null, React.createElement(AppHeader_1.AppHeader, null), React.createElement(searchResults_1.SearchResults, {query: "Document"}));
    };
    return ReactTests;
}(React.Component));



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./AppHeader":1,"./searchResults":3}]},{},[4])
//# sourceMappingURL=bundle-spsearchReact.js.map
