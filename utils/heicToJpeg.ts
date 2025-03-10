// import heic2any from "heic2any"

export const convertHeicToJpeg = async (file: File): Promise<File> => {
  const heic2any = require("heic2any");
  const blob = (await heic2any({ blob: file, toType: "image/jpeg" })) as Blob;
  return new File([blob], file.name.replace(/\..+$/, ".jpg"), {
    type: "image/jpeg",
  });
};
