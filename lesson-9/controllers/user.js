import * as fs from 'node:fs';
import User from '../models/user.js';

async function uploadAvatar(req, res, next) {
  console.log(req.file);
  res.send('Upload avatar');
}

export default { uploadAvatar };
