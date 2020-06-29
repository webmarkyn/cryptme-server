import { Router } from 'express';
import { UploadedFile } from 'express-fileupload';
import * as crypto from 'crypto';

// Init router and path
const router = Router();

// Add sub-routes
router.post('/', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    const file: UploadedFile = req.files.file as UploadedFile;
    const key = crypto.randomBytes(16).toString('hex');
    const iv = crypto.randomBytes(8).toString('hex');
    console.log('key: '+key)
    console.log('salt:' + iv)
    const cipher = crypto.createCipheriv('aes-256-ctr', key, iv)
    const crypted = Buffer.concat([cipher.update(file.data), cipher.final()])
    res.writeHead(200, {
        'Content-Type': file.mimetype,
        'Content-disposition': 'attachment;filename=' + file.name,
    });
    res.end(crypted);
});

router.post('/de', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        return res.status(400).send('No files were uploaded');
    }
    console.log(req.body);
    if (!req.body.key || !req.body.algo || !req.body.salt) {
        return res.status(400).send('Key or encryption algorithm invalid');
    }
    const file: UploadedFile = req.files.file as UploadedFile;
    const key: string = req.body.key;
    const algo: string = req.body.algo;
    const salt: string = req.body.salt;
    console.log('key: '+key)
    console.log('salt:' + salt)
    const decipher = crypto.createDecipheriv('aes-256-ctr', key, salt);
    const dec = Buffer.concat([decipher.update(file.data), decipher.final()]);
    res.writeHead(200, {
        'Content-Type': file.mimetype,
        'Content-disposition': 'attachment;filename=' + file.name,
    });
    res.end(dec);
})

// Export the base-router
export default router;
