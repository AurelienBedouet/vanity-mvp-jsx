import React from "react";
import FormWrapper from "../FormWrapper";
import ProfilePicture from "../../ProfilePicture";
import Image from "next/image";

const FirstStep = ({ username, avatar, age, sexe, updateFields }) => {
  return (
    <FormWrapper title="User Details">
      <div className="flex flex-col xs:flex-row items-center justify-between w-full">
        <label
          htmlFor="username"
          className="block w-full xs:max-w-[92px] mb-4 xs:mb-0 text-center xs:text-left"
        >
          Username
        </label>
        <input
          type="text"
          value={username || ""}
          onChange={e =>
            updateFields(prev => ({ ...prev, username: e.target.value }))
          }
          autoFocus
          required
          id="username"
          className="w-full xs:w-[80%] rounded"
        />
      </div>

      <div className="flex flex-col xs:flex-row items-center justify-between w-full">
        <label
          htmlFor="age"
          className="block w-full xs:max-w-[92px] mb-4 xs:mb-0 text-center xs:text-left"
        >
          Age
        </label>
        <input
          type="number"
          value={age || ""}
          onChange={e =>
            updateFields(prev => ({ ...prev, age: e.target.value }))
          }
          min="1"
          required
          id="age"
          className="w-full xs:w-[80%] rounded"
        />
      </div>

      <div className="flex flex-col xs:flex-row items-center justify-between w-full">
        <label
          htmlFor="sexe"
          className="block w-full xs:max-w-[92px] mb-4 xs:mb-0 text-center xs:text-left"
        >
          Sexe
        </label>
        <select
          value={sexe || ""}
          id="sexe"
          onChange={e =>
            updateFields(prev => ({ ...prev, sexe: e.target.value }))
          }
          required
          className="w-full xs:w-[80%] rounded"
        >
          <option value="" disabled>
            Select an option...
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="androgynous">Androgynous</option>
        </select>
      </div>

      <div className="py-4 w-full flex justify-around items-center">
        <span className="block text-center">Profile picture</span>
        {avatar ? (
          <Image
            src={avatar}
            alt="profile picture"
            width={64}
            height={64}
            className="aspect-square rounded-full"
          />
        ) : (
          <div className="w-16 h-16 border border-gray-500 bg-white rounded-full" />
        )}
      </div>

      <ProfilePicture avatar={avatar} updateAvatar={updateFields} />
    </FormWrapper>
  );
};

export default FirstStep;
