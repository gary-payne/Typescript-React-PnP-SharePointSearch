"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var sp_pnp_js_1 = require("sp-pnp-js");
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
        return React.createElement("header", null, React.createElement("h1", {className: "ms-borderColor-teal"}, "This is a React Search Component"), React.createElement("div", null, "Uses Typescript, React, Office UI Fabric and the PnP cor library."), React.createElement("div", null, "Built in Visual Studio Code using Gulp and Browserify"), React.createElement("div", null, "Welcome, ", this.myLoginName, ", to ", this.state.siteTitle));
    };
    return AppHeader;
}(React.Component));
exports.AppHeader = AppHeader;

//# sourceMappingURL=AppHeader.js.map
