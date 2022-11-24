// Regular expression pattern for URL - checks if url is valid
// export const validateWebsiteUrl = websiteUrl => {
//   const urlRegEx = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
//   return urlRegEx.test(String(websiteUrl).toLowerCase());
// };

// export const isImage = url => {
//   return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
// };

export const isImgUrl = async url => {
  return fetch(url, {mode: 'no-cors', method: 'HEAD'}).then(res => {
    return res.headers.get('Content-Type')?.startsWith('image');
  });
};