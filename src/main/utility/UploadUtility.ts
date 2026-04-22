
import fs from 'node:fs';
import path from 'node:path';

import express from 'express';
import multer from 'multer';

import GeneralConfig from '../config/GeneralConfig';
import ErrorHandler from '../middleware/ErrorHandler';
import Logging from '../config/LoggingConfig';

export interface UploadedFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
}

export interface AttachmentsType {
  id: number;
  name: string;
  path: string;
  type: string;
  media_type: string;
  index: number;
  createdAt: string;
  createdBy: string;
}

const imageMimeType = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'image/bmp',
  'image/webp',
  'image/tiff',
  'image/svg+xml',
  'image/x-icon',
];

const fileMimeType = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'];

const videoMimeType = ['video/mp4'];

const allMimeType = [imageMimeType, fileMimeType, videoMimeType];
const _allMimeType = [...imageMimeType, ...fileMimeType, ...videoMimeType];

const storage = multer.diskStorage({
  destination: function (req: any, _file: any, cb: any) {
    const storage_dir = (GeneralConfig.STORAGE_DIR as string) || '';
    const uploadFolder = path.join(storage_dir);

    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder, { recursive: true });
    }

    cb(null, uploadFolder);
  },
  filename: function (_req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const UploadFile = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter(req, file, callback) {
    const allowedMimeTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/bmp',
      'image/webp',
      'image/tiff',
      'image/svg+xml',
      'image/x-icon',
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'video/mp4',
    ];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new ErrorHandler(
        400,
        'Unallowed MIME Type. List of allowed MIME Type:\n' +
        allowedMimeTypes.join('\n'),
      );
    }
    callback(null, true);
  },
});

export async function uploadMiddleware(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  const uploadRequest = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
    fileFilter: (_req: any, file: any, cb: any) => {
      if (imageMimeType.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', file), false);
      }
    },
  }).array('files');

  try {
    uploadRequest(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.

        return res.status(403).json({
          statusCode: 403,
          message: 'Invalid File format. must be image or pdf or video/mp4',
        });
      } // Everything went fine.
      next();
    });
  } catch (e) {
    next(e);
  }
}

export async function uploadSingleImageFileMiddleware(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  const uploadRequest = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
    fileFilter: (_req: any, file: any, cb: any) => {
      if (imageMimeType.concat(fileMimeType).includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', file), false);
      }
    },
  }).single('file');

  try {
    uploadRequest(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.

        return res.status(403).json({
          statusCode: 403,
          message: 'Invalid File format. must be image or application/pdf',
        });
      } // Everything went fine.
      next();
    });
  } catch (e) {
    next(e);
  }
}

export async function uploadSingleImageMultiFileMiddleware(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  const uploadRequest = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
    fileFilter: (_req: any, file: any, cb: any) => {
      console.log("footer", file.mimetype)
      if (imageMimeType.concat(imageMimeType).includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', file), false);
      }
    },
  }).fields([{
    name: 'fileheader', maxCount: 1
  }, {
    name: 'filefooter', maxCount: 1
  }])

  try {
    uploadRequest(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.

        return res.status(403).json({
          statusCode: 403,
          message: 'Invalid File format. must be image ',
        });
      } // Everything went fine.
      next();
    });
  } catch (e) {
    next(e);
  }
}



export async function uploadMultiImageFileMiddleware(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  const uploadRequest = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
    fileFilter: (_req: any, file: any, cb: any) => {
      if (imageMimeType.concat(fileMimeType).includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', file), false);
      }
    },
  }).array('files');

  try {
    uploadRequest(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.

        return res.status(403).json({
          statusCode: 403,
          message: 'Invalid File format. must be image or application/pdf',
        });
      } // Everything went fine.
      next();
    });
  } catch (e) {
    next(e);
  }
}

export async function uploadSingleImageMiddleware(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  const uploadRequest = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
    fileFilter: (_req: any, file: any, cb: any) => {
      if (imageMimeType.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', file), false);
      }
    },
  }).single('file');

  try {
    uploadRequest(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.

        return res.status(403).json({
          statusCode: 403,
          message: 'Invalid File format. must be image',
        });
      } // Everything went fine.
      next();
    });
  } catch (e) {
    next(e);
  }
}

export async function uploadImageMiddleware(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  const uploadRequest = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
    fileFilter: (_req: any, file: any, cb: any) => {
      if (imageMimeType.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', file), false);
      }
    },
  }).array('files', 5);

  try {
    uploadRequest(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.

        return res.status(403).json({
          statusCode: 403,
          message: 'Invalid File format. must be image',
        });
      } // Everything went fine.
      next();
    });
  } catch (e) {
    next(e);
  }
}

export async function uploadSingleFileMiddleware(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  const uploadRequest = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
    fileFilter: (_req: any, file: any, cb: any) => {
      if (fileMimeType.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', file), false);
      }
    },
  }).single('file');

  try {
    uploadRequest(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.

        Logging.error(err);
        return res.status(403).json({
          statusCode: 403,
          message: 'Invalid File format. must be pdf',
        });
      } // Everything went fine.
      next();
    });
  } catch (e) {
    next(e);
  }
}

export async function uploadSingleAlltypeMiddleware(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  const uploadRequest = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
    fileFilter: (_req: any, file: any, cb: any) => {
      if (_allMimeType.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', file), false);
      }
    },
  }).single('file');

  try {
    uploadRequest(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        Logging.error(err);
        return res.status(403).json({
          statusCode: 403,
          message: 'Invalid File format. must be pdf, doc, docx, image, and mp4',
        });
      } // Everything went fine.
      next();
    });
  } catch (e) {
    next(e);
  }
}
