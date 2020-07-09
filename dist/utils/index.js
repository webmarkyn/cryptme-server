"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupHeaders = exports.checkParams = exports.checkFile = exports.cryptFileWithSalt = void 0;
const tslib_1 = require("tslib");
const crypto = tslib_1.__importStar(require("crypto"));
const constants_1 = require("@shared/constants");
const cryptFileWithSalt = (file, decrypt = false, { algo = "aes-256-ctr", key = crypto.randomBytes(16).toString("hex"), salt = crypto.randomBytes(8).toString("hex"), }) => {
    if (!decrypt) {
        const cipher = crypto.createCipheriv(algo, key, salt);
        const crypted = Buffer.concat([cipher.update(file.data), cipher.final()]);
        return crypted;
    }
    else {
        const cipher = crypto.createDecipheriv(algo, key, salt);
        const decrypted = Buffer.concat([cipher.update(file.data), cipher.final()]);
        return decrypted;
    }
};
exports.cryptFileWithSalt = cryptFileWithSalt;
const checkFile = (files) => {
    if (!files || !files.file) {
        return false;
    }
    else
        return true;
};
exports.checkFile = checkFile;
const checkParams = ({ algo, key, salt }) => {
    if (!algo || !key || !salt) {
        return false;
    }
    const chosenAlgo = constants_1.algoList[algo];
    if (!chosenAlgo || key.length !== chosenAlgo.keyLength || salt.length !== chosenAlgo.ivLength) {
        return false;
    }
    else
        return true;
};
exports.checkParams = checkParams;
const setupHeaders = (res, file) => {
    if (file) {
        res.writeHead(200, {
            'Content-Type': file.mimetype,
            'Content-disposition': 'attachment;filename=' + 'encrypted_' + file.name,
            'Connection': 'close',
        });
    }
    else {
        res.writeHead(200, {
            'Connection': 'close'
        });
    }
};
exports.setupHeaders = setupHeaders;
