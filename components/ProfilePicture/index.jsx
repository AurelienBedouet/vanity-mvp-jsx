import React, { useState } from "react";
import { imageOptions } from "../../utils/data";
import TabContent from "../Tab/TabContent";
import Image from "next/image";
import Upload from "./Upload";
import Link from "./Link";
import Gallery from "./Gallery";

const ProfilePicture = ({ avatar, updateAvatar }) => {
  const [currentTab, setCurrentTab] = useState("option1");

  const handleTabClick = e => {
    e.preventDefault();
    setCurrentTab(e.target.id);
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Tabs */}
      <div className="flex justify-between w-full">
        {imageOptions.map(tab => (
          <button
            className="text-base font-medium border border-gray-700 cursor-pointer p-2 w-full transition ease-out duration-500 hover:text-white hover:bg-gray-400 disabled:text-white disabled:bg-gray-700 disabled:cursor-default"
            key={tab.id}
            id={tab.id}
            disabled={currentTab === `${tab.id}`}
            onClick={handleTabClick}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Tabs Content */}
      <div className="w-full">
        <TabContent id="option1" currentTab={currentTab}>
          <Upload updateAvatar={updateAvatar} />
        </TabContent>
        <TabContent id="option2" currentTab={currentTab}>
          <Link updateAvatar={updateAvatar} />
        </TabContent>
        <TabContent id="option3" currentTab={currentTab}>
          <Gallery updateAvatar={updateAvatar} />
        </TabContent>
      </div>
    </div>
  );
};

export default ProfilePicture;
