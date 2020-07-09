"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const utils_1 = require("src/utils");
const constants_1 = require("@shared/constants");
const router = express_1.Router();
router.post("/encrypt", (req, res) => {
    if (!req.files || !utils_1.checkFile(req.files)) {
        return res.status(400).end("Please upload correct file");
    }
    if (!utils_1.checkParams(req.body)) {
        return res.status(400).end("Please provide correct parameters");
    }
    const file = req.files.file;
    const encrypted = utils_1.cryptFileWithSalt(file, false, req.body);
    utils_1.setupHeaders(res, file);
    res.end(encrypted);
});
router.post("/decrypt", (req, res) => {
    if (!req.files || !utils_1.checkFile(req.files)) {
        return res.status(400).end("Please upload correct file");
    }
    if (!utils_1.checkParams(req.body)) {
        return res.status(400).end("Please provide correct parameters");
    }
    const file = req.files.file;
    const decrypted = utils_1.cryptFileWithSalt(file, true, req.body);
    utils_1.setupHeaders(res, file);
    res.end(decrypted);
});
router.get("/algorithms", (req, res) => {
    res.send(JSON.stringify(constants_1.algoList));
});
exports.default = router;
