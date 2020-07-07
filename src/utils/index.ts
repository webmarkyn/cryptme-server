import * as crypto from "crypto";
import fileUpload, { UploadedFile } from "express-fileupload";
import { Response } from 'express';
import { algoList } from '@shared/constants';

// Types
type Params = {
  algo: string;
  key: string;
  salt: string;
};

type CryptFileFunction = (
  file: UploadedFile,
  decrypt: boolean,
  body: Params
) => Buffer;

// File encryption using parameters and salt
const cryptFileWithSalt: CryptFileFunction = (
  file,
  decrypt = false,
  {
    algo = "aes-256-ctr",
    key = crypto.randomBytes(16).toString("hex"),
    salt = crypto.randomBytes(8).toString("hex"),
  }
): Buffer => {
  if (!decrypt) {
    const cipher = crypto.createCipheriv(algo, key, salt);
    const crypted = Buffer.concat([cipher.update(file.data), cipher.final()]);
    return crypted;
  } else {
    const cipher = crypto.createDecipheriv(algo, key, salt);
    const decrypted = Buffer.concat([cipher.update(file.data), cipher.final()]);
    return decrypted;
  }
};

// Checks if the file exists
const checkFile = (files: fileUpload.FileArray | undefined): boolean => {
  if (!files || !files.file) {
    return false;
  } else return true;
};

// Checks if every needed parametes exist
const checkParams = ({ algo, key, salt }: Params): boolean => {
  if (!algo || !key || !salt) {
    return false;
  }
  const chosenAlgo = algoList[algo]
  if (!chosenAlgo || key.length !== chosenAlgo.keyLength || salt.length !== chosenAlgo.ivLength ) {
    return false
  }
  else return true;
};

// Set proper headers for the response
const setupHeaders = (res: Response, file?: UploadedFile | undefined) => {
    if (file) {
        res.writeHead(200, {
            'Content-Type': file.mimetype,
            'Content-disposition': 'attachment;filename=' + 'encrypted_' + file.name,
            'Connection': 'close',
        })
    } else {
        res.writeHead(200, {
            'Connection': 'close'
        })
    }
}

export { cryptFileWithSalt, checkFile, checkParams, setupHeaders };
