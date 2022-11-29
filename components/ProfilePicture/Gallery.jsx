import Image from "next/image";
import React from "react";
import { avatars } from "../../utils/data";

const Gallery = ({ updateAvatar }) => {
  return (
    <div className="pt-6 pb-4 flex justify-center items-center flex-wrap gap-4">
      {avatars.map(({ id, src }) => (
        <Image
          key={id}
          onClick={() => updateAvatar(prev => ({ ...prev, avatar: src }))}
          src={src || ""}
          alt="avatar"
          width={72}
          height={72}
          className="rounded-xl shadow-xl cursor-pointer transform transition duration-200 hover:scale-105"
        />
      ))}
    </div>
  );
};

export default Gallery;
