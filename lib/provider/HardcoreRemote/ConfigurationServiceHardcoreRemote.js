"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../utils");
var endpoint = '/io.scalecube.configuration.api.ConfigurationService';
var ConfigurationServiceHardcoreRemote = /** @class */ (function () {
    function ConfigurationServiceHardcoreRemote(token, dispatcher) {
        this.token = token;
        this.dispatcher = dispatcher;
        if (!this.token) {
            throw new Error(utils_1.messages.tokenNotProvided);
        }
    }
    ;
    ConfigurationServiceHardcoreRemote.prototype.prepRequest = function (request) {
        return __assign({ token: {
                token: this.token,
                issuer: 'Auth0'
            } }, request);
    };
    ConfigurationServiceHardcoreRemote.prototype.createRepository = function (request) {
        if (utils_1.repositoryRequestValidator(request)) {
            return Promise.reject(new Error(utils_1.messages.repositoryNotProvided));
        }
        return this.dispatcher.dispatch(endpoint + "/createRepository", this.prepRequest(request));
    };
    ConfigurationServiceHardcoreRemote.prototype.delete = function (request) {
        if (utils_1.repositoryRequestValidator(request)) {
            return Promise.reject(new Error(utils_1.messages.repositoryNotProvided));
        }
        return this.dispatcher.dispatch(endpoint + "/delete", this.prepRequest(request));
    };
    ConfigurationServiceHardcoreRemote.prototype.entries = function (request) {
        if (utils_1.repositoryRequestValidator(request)) {
            return Promise.reject(new Error(utils_1.messages.repositoryNotProvided));
        }
        return this.dispatcher.dispatch(endpoint + "/entries", this.prepRequest({}));
    };
    ConfigurationServiceHardcoreRemote.prototype.fetch = function (request) {
        if (utils_1.repositoryRequestValidator(request)) {
            return Promise.reject(new Error(utils_1.messages.repositoryNotProvided));
        }
        if (utils_1.repositoryKeyRequestValidator(request)) {
            return Promise.reject(new Error(utils_1.messages.repositoryKeyNotProvided));
        }
        return this.dispatcher.dispatch(endpoint + "/fetch", this.prepRequest(request));
    };
    ConfigurationServiceHardcoreRemote.prototype.save = function (request) {
        if (utils_1.repositoryRequestValidator(request)) {
            return Promise.reject(new Error(utils_1.messages.repositoryNotProvided));
        }
        if (utils_1.repositoryKeyRequestValidator(request)) {
            return Promise.reject(new Error(utils_1.messages.repositoryKeyNotProvided));
        }
        return this.dispatcher.dispatch(endpoint + "/save", this.prepRequest(request));
    };
    return ConfigurationServiceHardcoreRemote;
}());
exports.ConfigurationServiceHardcoreRemote = ConfigurationServiceHardcoreRemote;
