"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const maxLoop = 10;
var currentLoop = 0;
var launchTimeout = () => {
    if (maxLoop > currentLoop) {
        setTimeout(() => launchTimeout(), 10000);
        currentLoop++;
        console.log('currentLoop', currentLoop);
    }
};
launchTimeout();
//# sourceMappingURL=index.js.map