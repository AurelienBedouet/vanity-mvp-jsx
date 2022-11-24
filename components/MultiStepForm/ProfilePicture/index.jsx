import React, { useEffect, useState } from "react";
import { imageOptions } from "../data";
import TabContent from "../../Tab/TabContent";
import Image from "next/image";
import Upload from "./Upload";
import Link from "./Link";
import Gallery from "./Gallery";

const ProfilePicture = ({ avatar, updateFields }) => {
  const [currentTab, setCurrentTab] = useState("option1");

  const handleTabClick = e => {
    e.preventDefault();
    setCurrentTab(e.target.id);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="py-4 w-full flex justify-around items-center">
        <span className="block text-center">Profile picture</span>
        {avatar ? (
          <Image
            src={avatar}
            alt={username || "profile picture"}
            width={64}
            height={64}
            className="aspect-square rounded-full"
          />
        ) : (
          <div className="w-16 h-16 border border-gray-500 bg-white rounded-full" />
        )}
      </div>

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
          <Upload updateFields={updateFields} />
        </TabContent>
        <TabContent id="option2" currentTab={currentTab}>
          <Link updateFields={updateFields} />
        </TabContent>
        <TabContent id="option3" currentTab={currentTab}>
          <Gallery updateFields={updateFields} />
        </TabContent>
      </div>

      {avatar ? (
        <p className="text-green-500 mt-2">Image successfully selected.</p>
      ) : (
        <p className="text-red-500 mt-2">No images selected yet.</p>
      )}
    </div>
  );
};

export default ProfilePicture;
