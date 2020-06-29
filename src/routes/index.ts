import { Router } from 'express';
import { UploadedFile } from 'express-fileupload';
import * as crypto from 'crypto';
import { checkFile, checkParams, setupHeaders, cryptFileWithSalt } from 'src/utils';

// Init router and path
const router = Router();

// Add sub-routes
router.post('/encrypt', (req, res) => {
    if (!checkFile(req.files) || !req.files) {
        return res.status(400).end("Please upload correct file");
    }
    if (!checkParams(req.body)) {
        return res.status(400).end("Please provide correct parameters");
    }
    const file: UploadedFile = req.files.file as UploadedFile;
    const encrypted = cryptFileWithSalt(file, false, req.body)
    setupHeaders(res, file);
    res.end(encrypted);
});

router.post('/decrypt', (req, res) => {
    if (!checkFile(req.files) || !req.files) {
        return res.status(400).end("Please upload correct file");
    }
    if (!checkParams(req.body)) {
        return res.status(400).end("Please provide correct parameters");
    }
    const file: UploadedFile = req.files.file as UploadedFile;
    const decrypted = cryptFileWithSalt(file, true, req.body)
    setupHeaders(res, file);
    res.end(decrypted);
})

// Export the base-router
export default router;
