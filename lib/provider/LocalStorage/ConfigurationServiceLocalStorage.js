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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../utils");
var ConfigurationServiceLocalStorage = /** @class */ (function () {
    function ConfigurationServiceLocalStorage(token) {
        this.token = token;
        if (!this.token) {
            throw new Error(utils_1.messages.tokenNotProvided);
        }
    }
    ConfigurationServiceLocalStorage.prototype.getRepository = function (repository) {
        var rawString = localStorage.getItem(this.token + "." + repository);
        if (!rawString) {
            return Promise.reject(new Error("Configuration repository " + repository + " not found"));
        }
        try {
            return Promise.resolve(JSON.parse(rawString));
        }
        catch (error) {
            return Promise.reject(error);
        }
    };
    ConfigurationServiceLocalStorage.prototype.createRepository = function (request) {
        var _this = this;
        if (utils_1.repositoryRequestValidator(request)) {
            return Promise.reject(new Error(utils_1.messages.repositoryNotProvided));
        }
        return new Promise(function (resolve, reject) {
            _this.getRepository(request.repository).then(function () {
                reject(new Error(utils_1.messages.repositoryAlreadyExists));
            }).catch(function () {
                localStorage.setItem(_this.token + "." + request.repository, JSON.stringify({}));
                return resolve({ repository: request.repository });
            });
        });
    };
    ConfigurationServiceLocalStorage.prototype.delete = function (request) {
        var _this = this;
        if (utils_1.repositoryRequestValidator(request)) {
            return Promise.reject(new Error(utils_1.messages.repositoryNotProvided));
        }
        return new Promise(function (resolve, reject) {
            _this.getRepository(request.repository).then(function (repository) {
                if (request.key) {
                    if (!repository.hasOwnProperty(request.key)) {
                        reject(new Error("Configuration repository key " + request.key + " not found"));
                    }
                    var _a = request.key, value = repository[_a], rest = __rest(repository, [typeof _a === "symbol" ? _a : _a + ""]);
                    localStorage.setItem(_this.token + "." + request.repository, JSON.stringify(rest));
                }
                else {
                    localStorage.removeItem(_this.token + "." + request.repository);
                }
                resolve({});
            }).catch(reject);
        });
    };
    ConfigurationServiceLocalStorage.prototype.entries = function (request) {
        if (utils_1.repositoryRequestValidator(request)) {
            return Promise.reject(new Error(utils_1.messages.repositoryNotProvided));
        }
        return this.getRepository(request.repository).then(function (repository) { return ({
            entries: Object.keys(repository).map(function (key) { return ({ key: key, value: repository[key] }); })
        }); });
    };
    ;
    ConfigurationServiceLocalStorage.prototype.fetch = function (request) {
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
    ConfigurationServiceLocalStorage.prototype.save = function (request) {
        var _this = this;
        if (utils_1.repositoryRequestValidator(request)) {
            return Promise.reject(new Error(utils_1.messages.repositoryNotProvided));
        }
        if (utils_1.repositoryKeyRequestValidator(request)) {
            return Promise.reject(new Error(utils_1.messages.repositoryKeyNotProvided));
        }
        return new Promise(function (resolve, reject) {
            _this.getRepository(request.repository).then(function (repository) {
                var _a;
                localStorage.setItem(_this.token + "." + request.repository, JSON.stringify(__assign({}, repository, (_a = {}, _a[request.key] = request.value, _a))));
                resolve({});
            }).catch(reject);
        });
    };
    return ConfigurationServiceLocalStorage;
}());
exports.ConfigurationServiceLocalStorage = ConfigurationServiceLocalStorage;
