"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const request_1 = require("../utils/request");
exports.authService = {
    login(data) {
        return (0, request_1.request)({
            url: '/auth/login',
            method: 'POST',
            data
        });
    },
    register(data) {
        return (0, request_1.request)({
            url: '/auth/register',
            method: 'POST',
            data
        });
    },
    getProfile() {
        return (0, request_1.request)({
            url: '/auth/profile',
            method: 'GET'
        });
    }
};
