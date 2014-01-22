/* global exports:true, module, define */

(function() {
    "use strict";

    var baseUnderscore = this._;

    this._.templateSettings = this._.extend(this._.templateSettings, {
        trim: /\n\s*/g
    });

    var noMatch = /(.)^/;

    this._.template = function(text, data, settings) {
        settings = this._.defaults({}, settings, this._.templateSettings);

        var result = baseUnderscore.template(text, data, settings);

        if (data) {
            return result.replace(settings.trim || noMatch, "");
        }

        var callback = function(data) {
            return result(data).replace(settings.trim || noMatch, "");
        };

        return callback;
    };

    if (typeof exports !== "undefined") {
        if (typeof module !== "undefined" && module.exports) {
            exports = module.exports = this._;
        }
        exports._ = this._;
    }

    if (typeof define === "function" && define.amd) {
        define([], function() {
            return this._;
        });
    }

}).call(this);
