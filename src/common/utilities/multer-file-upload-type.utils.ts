export const csvFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(csv)$/)) {
    return callback(new Error('Only image or PDF files are allowed!'), false);
  }
  callback(null, true);
};
