import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { isImgUrl } from "../../../utils/helpers";

const Link = ({ updateFields }) => {
  const [linkImage, setLinkImage] = useState({
    websiteUrl: "",
    isValid: false,
  });

  // Link Image Solution
  // const onChangeLinkImage = async e => {
  //   const { value } = e.target;
  //   const checkImgUrl = await isImgUrl(value);
  //   console.log(checkImgUrl);
  //   const isValid = !value || checkImgUrl;

  //   setLinkImage({
  //     websiteUrl: value,
  //     isValid,
  //   });
  // };

  // useEffect(() => {
  //   fetch(linkImage.websiteUrl, { mode: "no-cors" }).then(res => {
  //     if (res.status === 200) setLinkImage({ ...linkImage, isValid: true });
  //     else setLinkImage({ ...linkImage, isValid: false });
  //   });
  // });

  // const submitLinkImage = async () => {
  //   if (!linkImage.websiteUrl) return;

  //   updateFields({ avatar: linkImage.websiteUrl });
  // };

  return (
    <div className="pt-6 flex flex-col items-center gap-6">
      <div className="relative w-full flex justify-center">
        <input
          type="text"
          value={linkImage.websiteUrl}
          name={linkImage.websiteUrl}
          // onChange={onChangeLinkImage}
          onChange={e =>
            setLinkImage({ ...linkImage, websiteUrl: e.target.value })
          }
          placeholder="https://my-image.com"
          className="w-[80%] border-2 rounded-lg py-1 pl-2 pr-8"
        />
        {linkImage.websiteUrl ? (
          <button
            onClick={() => setLinkImage({ ...linkImage, websiteUrl: "" })}
            className="absolute right-12 top-2 border-2 rounded border-gray-500"
          >
            <AiOutlineClose />
          </button>
        ) : null}
      </div>
      {linkImage?.websiteUrl && !linkImage?.isValid && (
        <div className="text-red-600">URL is invalid</div>
      )}
      <button
        onClick={() => updateFields({ avatar: linkImage.websiteUrl })}
        type="button"
        disabled={!linkImage.isValid}
        className={`app__buttons w-[80%] ${
          !linkImage.isValid ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Submit
      </button>
    </div>
  );
};

export default Link;
