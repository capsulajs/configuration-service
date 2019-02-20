"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var utils_1 = require("../../utils");
var ConfigurationServiceFile = /** @class */ (function () {
    function ConfigurationServiceFile(filename) {
        this.filename = filename;
        if (!this.filename) {
            throw new Error(utils_1.messages.filenameNotProvided);
        }
        var content;
        try {
            content = fs_1.default.readFileSync(filename, 'utf8');
        }
        catch (_a) {
            throw new Error(utils_1.messages.fileOrDirectoryNotExist);
        }
        try {
            this.storage = JSON.parse(content);
        }
        catch (_b) {
            throw new Error(utils_1.messages.fileNotValid);
        }
    }
    ConfigurationServiceFile.prototype.getRepository = function (repository) {
        var data = this.storage[repository];
        if (!data) {
            return Promise.reject(new Error("Configuration repository " + repository + " not found"));
        }
        return Promise.resolve(data);
    };
    ConfigurationServiceFile.prototype.createRepository = function (request) {
        return Promise.reject(new Error(utils_1.messages.notImplemented));
    };
    ConfigurationServiceFile.prototype.delete = function (request) {
        return Promise.reject(new Error(utils_1.messages.notImplemented));
    };
    ConfigurationServiceFile.prototype.entries = function (request) {
        if (utils_1.repositoryRequestValidator(request)) {
            return Promise.reject(new Error(utils_1.messages.repositoryNotProvided));
        }
        return this.getRepository(request.repository).then(function (repository) { return ({
            entries: Object.keys(repository).map(function (key) { return ({ key: key, value: repository[key] }); })
        }); });
    };
    ;
    ConfigurationServiceFile.prototype.fetch = function (request) {
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
    ConfigurationServiceFile.prototype.save = function (request) {
        return Promise.reject(new Error(utils_1.messages.notImplemented));
    };
    return ConfigurationServiceFile;
}());
exports.ConfigurationServiceFile = ConfigurationServiceFile;
