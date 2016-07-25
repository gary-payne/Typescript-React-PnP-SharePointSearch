"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var ReactDOM = require("react-dom");
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

//# sourceMappingURL=spReactTests.js.map
