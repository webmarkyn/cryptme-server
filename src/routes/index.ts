import { Router } from "express";
import { UploadedFile } from "express-fileupload";
import {
  checkFile,
  checkParams,
  setupHeaders,
  cryptFileWithSalt,
} from "@utils/index";
import { algoList } from "@shared/constants";

// Init router and path
const router = Router();

// Add sub-routes
router.post("/encrypt", (req, res) => {
  if (!req.files || !checkFile(req.files)) {
    return res.status(400).end("Please upload correct file");
  }
  if (!checkParams(req.body)) {
    return res.status(400).end("Please provide correct parameters");
  }
  const file: UploadedFile = req.files.file as UploadedFile;
  const encrypted = cryptFileWithSalt(file, false, req.body);
  setupHeaders(res, file);
  res.end(encrypted);
});

router.post("/decrypt", (req, res) => {
  if (!req.files || !checkFile(req.files)) {
    return res.status(400).end("Please upload correct file");
  }
  if (!checkParams(req.body)) {
    return res.status(400).end("Please provide correct parameters");
  }
  const file: UploadedFile = req.files.file as UploadedFile;
  const decrypted = cryptFileWithSalt(file, true, req.body);
  setupHeaders(res, file);
  res.end(decrypted);
});

router.get("/algorithms", (req, res) => {
  res.send(JSON.stringify(algoList));
});

// Export the base-router
export default router;
