"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repositoryRequestValidator = function (request) { return request === undefined || request.repository === undefined; };
exports.repositoryKeyRequestValidator = function (request) { return request.key === undefined; };
exports.messages = {
    tokenNotProvided: 'Configuration repository token not provided',
    repositoryNotProvided: 'Configuration repository not provided',
    repositoryKeyNotProvided: 'Configuration repository key not provided',
    repositoryAlreadyExists: 'Configuration repository already exists'
};
