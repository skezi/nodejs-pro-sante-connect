"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = void 0;
const axios_1 = require("axios");
async function request(params) {
    const { data } = await (0, axios_1.default)({
        method: params.method,
        url: params.url,
        data: params.data,
        headers: Object.assign({ 'Content-Type': 'application/x-www-form-urlencoded' }, (params.token && { Authorization: `Bearer ${params.token}` })),
        responseType: 'json',
    });
    return data;
}
exports.request = request;
//# sourceMappingURL=fetcher.js.map