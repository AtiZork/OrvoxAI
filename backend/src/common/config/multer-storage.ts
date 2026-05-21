import { diskStorage } from 'multer';
import { extname } from 'path';
import { uploadSubdir } from './paths';

export function multerImageStorage(subfolder: string, filenamePrefix: string) {
  return diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, uploadSubdir(subfolder));
    },
    filename: (_req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, `${filenamePrefix}-${uniqueSuffix}${extname(file.originalname)}`);
    },
  });
}
