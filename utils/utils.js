export const getImageUrl = (filename) => {
  return `${process.env.REACT_APP_UPLOAD_HOST}/${process.env.REACT_APP_IMAGE_PATH}/${filename}`;
};
