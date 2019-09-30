const dataURItoBlob = (dataURI) => {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  const byteString = atob(dataURI.split(',')[1]);

  // separate out the mime component
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to an ArrayBuffer
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  // write the ArrayBuffer to a blob, and you're done
  return new Blob([ab], { type: mimeString });
};

export const onImageDrop = async ({
  files,
  maxFileSize,
  onUpload,
  rejected,
  setFileSizeError
}) => {
  if (rejected.length > 0) {
    if (rejected[0].size >= maxFileSize) {
      setFileSizeError(true);
    }
    return;
  }
  
  if (!files.length) return;
  
  setFileSizeError(false);
  
  const file = files[0];
  const img = new Image();
  
  img.onload = (e) => {
    const sizes = {
      width: e.target.width,
      height: e.target.height
    };
  
    const reader = new FileReader();
  
    reader.onload = (event) => {
      // Image service requires a binary, not base64 so we need to convert back
      const fileBlob = dataURItoBlob(event.target.result);
      onUpload({ blob: fileBlob, base64: event.target.result, sizes });
    };
    reader.readAsDataURL(file);
  };
  
  img.src = URL.createObjectURL(file);
};