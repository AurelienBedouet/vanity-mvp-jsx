import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { checkImage } from "../../utils/helpers";

const Link = ({ updateAvatar }) => {
  const [linkImage, setLinkImage] = useState("");
  const [isValid, setisValid] = useState(false);

  useEffect(() => {
    if (linkImage) checkImage(linkImage, setisValid);
  }, [linkImage]);

  return (
    <div className="pt-6 flex flex-col items-center gap-4">
      <div className="relative w-full flex justify-center">
        <input
          type="text"
          value={linkImage}
          onChange={e => setLinkImage(e.target.value)}
          placeholder="https://images.com/your-image"
          className="w-full border-2 rounded-lg py-2 pl-2 pr-8"
        />
        {linkImage ? (
          <button
            onClick={() => setLinkImage("")}
            className="absolute right-2 top-2 border-2 rounded border-gray-500 hover:bg-gray-300"
          >
            <AiOutlineClose size={24} />
          </button>
        ) : null}
      </div>
      {!linkImage.length > 0 && (
        <p className="text-gray-500">Enter a valid URL</p>
      )}
      {linkImage && isValid && <p className="text-green-500">URL is valid</p>}
      {linkImage && !isValid && <p className="text-red-500">URL is invalid</p>}
      <button
        onClick={() => updateAvatar(prev => ({ ...prev, avatar: linkImage }))}
        type="button"
        disabled={!isValid}
        className={`app__buttons w-1/2 ${
          !isValid || !linkImage ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Submit
      </button>
    </div>
  );
};

export default Link;
