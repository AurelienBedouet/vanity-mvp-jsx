import React, { useState } from "react";
import ProgressBar from "../ProgressBar";
import { v4 } from "uuid";
import { storage } from "../../utils/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Upload = ({ updateAvatar }) => {
  const [progressUploadImage, setProgressUploadImage] = useState(0);

  const onUploadImage = async e => {
    const uploadImage = e.target.files[0];

    const imageID = v4();
    const imageRef = ref(
      storage,
      `images/profilePictures/${uploadImage.name + imageID}`
    );

    const uploadTask = uploadBytesResumable(imageRef, uploadImage);

    uploadTask.on(
      "state_changed",
      snapshot => {
        setProgressUploadImage(
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        );
      },
      error => {
        console.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL =>
          updateAvatar(prev => ({ ...prev, avatar: downloadURL }))
        );
      }
    );
  };

  return (
    <div className="pt-6 flex flex-col items-center gap-4">
      <label
        htmlFor="imageUpload"
        className="app__buttons cursor-pointer text-center w-1/2"
      >
        Upload Image
      </label>
      <input
        onChange={onUploadImage}
        type="file"
        id="imageUpload"
        accept="image/png, image/jpeg"
        className="hidden"
      />
      <p>Accepted format: PNG or JPEG</p>
      <ProgressBar bgcolor={"rgb(34 197 94)"} completed={progressUploadImage} />
    </div>
  );
};

export default Upload;
