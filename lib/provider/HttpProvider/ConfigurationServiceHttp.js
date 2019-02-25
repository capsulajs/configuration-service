"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var capsulajs_transport_providers_1 = require("@capsulajs/capsulajs-transport-providers");
var utils_1 = require("../../utils");
var ConfigurationServiceHttp = /** @class */ (function () {
    function ConfigurationServiceHttp(token) {
        this.token = token;
        if (!this.token) {
            throw new Error(utils_1.messages.tokenNotProvided);
        }
        this.dispatcher = new capsulajs_transport_providers_1.AxiosDispatcher("http://" + token);
    }
    ConfigurationServiceHttp.prototype.getRepository = function (repository) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.dispatcher.dispatch("/" + repository, {}).then(function (repo) {
                repo ? resolve(repo) : reject(new Error("Configuration repository " + repository + " not found"));
            }).catch(function () { return reject(new Error("Configuration repository " + repository + " not found")); });
        });
    };
    ConfigurationServiceHttp.prototype.createRepository = function (request) {
        return Promise.reject(new Error(utils_1.messages.notImplemented));
    };
    ConfigurationServiceHttp.prototype.delete = function (request) {
        return Promise.reject(new Error(utils_1.messages.notImplemented));
    };
    ConfigurationServiceHttp.prototype.entries = function (request) {
        if (utils_1.repositoryRequestValidator(request)) {
            return Promise.reject(new Error(utils_1.messages.repositoryNotProvided));
        }
        return this.getRepository(request.repository).then(function (repository) { return ({
            entries: Object.keys(repository).map(function (key) { return ({ key: key, value: repository[key] }); })
        }); });
    };
    ;
    ConfigurationServiceHttp.prototype.fetch = function (request) {
        var _this = this;
        if (utils_1.repositoryRequestValidator(request)) {
            return Promise.reject(new Error(utils_1.messages.repositoryNotProvided));
        }
        if (utils_1.repositoryKeyRequestValidator(request)) {
            return Promise.reject(new Error(utils_1.messages.repositoryKeyNotProvided));
        }
        return new Promise(function (resolve, reject) {
            _this.getRepository(request.repository).then(function (repository) {
                return Object.keys(repository).indexOf(request.key) >= 0
                    ? resolve({ key: request.key, value: repository[request.key] })
                    : reject(new Error("Configuration repository key " + request.key + " not found"));
            }).catch(reject);
        });
    };
    ConfigurationServiceHttp.prototype.save = function (request) {
        return Promise.reject(new Error(utils_1.messages.notImplemented));
    };
    return ConfigurationServiceHttp;
}());
exports.ConfigurationServiceHttp = ConfigurationServiceHttp;
