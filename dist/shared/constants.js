"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.algoList = exports.paramMissingError = void 0;
exports.paramMissingError = 'One or more of the required parameters was missing.';
exports.algoList = {
    'blowfish': {
        keyLength: 32,
        ivLength: 8,
    },
    'aes-256-ctr': {
        keyLength: 32,
        ivLength: 16,
    },
    'des': {
        keyLength: 8,
        ivLength: 8,
    }
};
