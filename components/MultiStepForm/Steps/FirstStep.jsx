import React, { useEffect, useState } from "react";
import FormWrapper from "../FormWrapper";
import ProfilePicture from "../../ProfilePicture";
import Image from "next/image";

const FirstStep = ({ avatar, age, sexe, updateFields, setNextDisabled }) => {
  const [usernameValue, setUsernameValue] = useState("");
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [usernameMessage, setUsernameMessage] = useState("");

  const onChangeUsername = e => {
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    // Only set form value if length is < 3 OR it passes regex
    if (val.length > 3 && re.test(val)) {
      setUsernameValue(val);
      setIsUsernameValid(true);
    } else {
      setUsernameValue(val);
      setIsUsernameValid(false);
      console.log("Incorrect username");
    }
  };

  useEffect(() => {
    if (!isUsernameValid && usernameValue.length > 3) {
      setUsernameMessage("Incorrect Format.");
    } else if (usernameValue.length < 4) {
      setUsernameMessage("Username must be 4 characters minimum.");
    } else setUsernameMessage("Correct Format.");
  }, [isUsernameValid, usernameValue]);

  useEffect(() => {
    if (isUsernameValid) {
      updateFields(prev => ({ ...prev, username: usernameValue }));
      setNextDisabled(false);
    } else {
      setNextDisabled(true);
    }
  }, [isUsernameValid, updateFields, usernameValue, setNextDisabled]);

  return (
    <FormWrapper title="Profile 1">
      <div className="w-full">
        <div className="flex flex-col xs:flex-row items-center justify-between w-full">
          <label
            htmlFor="username"
            className="block w-full xs:max-w-[96px] mb-4 xs:mb-0 text-center xs:text-left"
          >
            Username
          </label>
          <input
            type="text"
            value={usernameValue || ""}
            onChange={onChangeUsername}
            autoFocus
            required
            id="username"
            className="w-full xs:w-[80%] rounded"
          />
        </div>
        <p
          className={`pt-2 xs:ml-24 text-center ${
            isUsernameValid ? "text-green-500" : "text-red-500"
          }`}
        >
          {usernameMessage}
        </p>
      </div>

      <div className="flex flex-col xs:flex-row items-center justify-between w-full">
        <label
          htmlFor="age"
          className="block w-full xs:max-w-[96px] mb-4 xs:mb-0 text-center xs:text-left"
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
          className="block w-full xs:max-w-[96px] mb-4 xs:mb-0 text-center xs:text-left"
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
        <Image
          src={avatar || "/hacker.png"}
          alt="profile picture"
          width={64}
          height={64}
          className="aspect-square rounded-full"
        />
      </div>

      <ProfilePicture avatar={avatar} updateAvatar={updateFields} />
    </FormWrapper>
  );
};

export default FirstStep;
