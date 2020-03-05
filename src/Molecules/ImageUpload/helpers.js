import { dataURItoBlob } from '../../helpers/files';

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
      onUpload({
        blob: fileBlob, base64: event.target.result, sizes
      });
    };
    reader.readAsDataURL(file);
  };
  
  img.src = URL.createObjectURL(file);
};