import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useRouter } from "next/router";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import ProfilePicture from "../../components/ProfilePicture";
import Checkbox from "../../components/Checkbox";
import { characterData, hobbiesData } from "../../utils/data";
import { FiEdit2 } from "react-icons/fi";
import Image from "next/image";

const UpdateForm = ({ setShow }) => {
  const router = useRouter();

  const { user, userData } = useContext(UserContext);

  const [updatedData, setUpdatedData] = useState(userData);
  const [disabled, setDisabled] = useState(true);
  const [edit1, setEdit1] = useState(false);
  const [edit2, setEdit2] = useState(false);
  const [editImage, setEditImage] = useState(false);

  const submitForm = async e => {
    e.preventDefault();

    const docRef = doc(db, "users", user?.uid);
    const updatedProfile = {
      updatedAt: serverTimestamp(),
      basicInfo: {
        ...updatedData,
      },
    };
    await updateDoc(docRef, updatedProfile);
    setShow(false);
    return router.push("/profile");
  };

  useEffect(() => {
    if (
      updatedData.character.isValid === true &&
      updatedData.hobbies.isValid === true
    ) {
      setDisabled(false);
    } else setDisabled(true);
  }, [updatedData.character.isValid, updatedData.hobbies.isValid]);

  return (
    <>
      <div className="bg-white rounded-lg xs:px-2 ss:px-4 py-12 w-full mx-auto">
        <form onSubmit={submitForm} className="flex flex-col gap-4">
          {/* Profile Picture */}
          <div className="w-full flex items-center justify-between xs:justify-start gap-2 xs:gap-4 sm:gap-8">
            <span className="block xs:min-w-[100px] font-semibold">
              Profile picture
            </span>
            {updatedData.avatar ? (
              <Image
                src={updatedData.avatar}
                alt="profile picture"
                width={64}
                height={64}
                className="aspect-square rounded-full"
              />
            ) : (
              <div className="w-16 h-16 border border-gray-500 bg-white rounded-full" />
            )}
            <button
              onClick={() => setEditImage(!editImage)}
              type="button"
              className="app__buttons flex items-center gap-2"
            >
              <FiEdit2 /> Edit
            </button>
          </div>
          {editImage ? (
            <div className="my-8">
              <ProfilePicture
                avatar={updatedData.avatar}
                updateAvatar={setUpdatedData}
              />
            </div>
          ) : null}

          {/* Username / Age / Sexe */}
          <div className="flex flex-col gap-4">
            {/* Username */}
            <div className="w-full flex items-center">
              <label htmlFor="username" className="min-w-[100px] font-semibold">
                Username
              </label>
              <input
                value={updatedData?.username || ""}
                onChange={e =>
                  setUpdatedData({ ...updatedData, username: e.target.value })
                }
                autoFocus
                type="text"
                id="username"
                className="w-full rounded"
              />
            </div>

            {/* Age */}
            <div className="w-full flex items-center">
              <label htmlFor="age" className="min-w-[100px] font-semibold">
                Age
              </label>
              <input
                value={updatedData?.age || ""}
                onChange={e =>
                  setUpdatedData({ ...updatedData, age: e.target.value })
                }
                min="1"
                type="number"
                id="age"
                className="w-full rounded"
              />
            </div>

            {/* Sexe */}
            <div className="w-full flex items-center">
              <label htmlFor="sexe" className="min-w-[100px] font-semibold">
                Sexe
              </label>
              <select
                value={updatedData?.sexe || ""}
                id="sexe"
                onChange={e =>
                  setUpdatedData({ ...updatedData, sexe: e.target.value })
                }
                className="w-full rounded"
              >
                <option value="" disabled>
                  Select an option...
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="androgynous">Androgynous</option>
              </select>
            </div>
          </div>

          {/* City / Zone */}
          <div className="flex flex-col gap-4">
            {/* City */}
            <div className="w-full flex items-center">
              <label htmlFor="city" className="min-w-[100px] font-semibold">
                City
              </label>
              <input
                type="text"
                value={updatedData?.city || ""}
                onChange={e =>
                  setUpdatedData({ ...updatedData, city: e.target.value })
                }
                required
                id="city"
                className="w-full rounded"
              />
            </div>

            {/* Zone */}
            <div className="w-full flex items-center">
              <label htmlFor="zone" className="min-w-[100px] font-semibold">
                Zone
              </label>
              <select
                value={updatedData?.zone || ""}
                id="zone"
                onChange={e =>
                  setUpdatedData({ ...updatedData, zone: e.target.value })
                }
                required
                className="w-full rounded"
              >
                <option value="" disabled>
                  Select an option...
                </option>
                <option value="urban">Urban</option>
                <option value="rural">Rural</option>
                <option value="suburban">Suburban</option>
              </select>
            </div>
          </div>

          {/* Profession / Ethnicity */}
          <div className="flex flex-col gap-4">
            {/* Profession */}
            <div className="w-full flex items-center">
              <label
                htmlFor="profession"
                className="min-w-[100px] font-semibold"
              >
                Profession
              </label>
              <select
                value={updatedData?.profession || ""}
                id="profession"
                onChange={e =>
                  setUpdatedData({ ...updatedData, profession: e.target.value })
                }
                required
                className="w-full rounded"
              >
                <option value="" disabled>
                  Select an option...
                </option>
                <option value="profession1">profession1</option>
                <option value="profession2">profession2</option>
                <option value="profession3">Profession3</option>
                <option value="profession4">Profession4</option>
                <option value="profession5">Profession5</option>
              </select>
            </div>

            {/* Ethnicity */}
            <div className="w-full flex items-center">
              <label
                htmlFor="ethnicity"
                className="min-w-[100px] font-semibold"
              >
                ethnicity
              </label>
              <select
                value={updatedData?.ethnicity || ""}
                id="ethnicity"
                onChange={e =>
                  setUpdatedData({ ...updatedData, ethnicity: e.target.value })
                }
                required
                className="w-full rounded"
              >
                <option value="" disabled>
                  Select an option...
                </option>
                <option value="white">White</option>
                <option value="black">Black</option>
                <option value="asian">Asian</option>
                <option value="arab">Arab</option>
              </select>
            </div>
          </div>

          <div>
            <div className="flex items-center flex-wrap gap-4 py-2">
              <p className="font-semibold">Character:</p>
              {updatedData?.character?.options?.map((item, index) => (
                <span
                  key={index}
                  className="bg-gray-500 text-white py-2 px-3 rounded mr-2 first:ml-4 font-semibold"
                >
                  {item}
                </span>
              ))}
              <button
                onClick={() => setEdit1(!edit1)}
                type="button"
                className="app__buttons flex items-center gap-2"
              >
                <FiEdit2 /> Edit
              </button>
            </div>
            {edit1 ? (
              <div className="my-8">
                <Checkbox
                  title={"character"}
                  data={characterData}
                  updateData={setUpdatedData}
                />
              </div>
            ) : null}
          </div>

          <div>
            <div className="flex items-center flex-wrap gap-4 py-2">
              <p className="font-semibold">Hobbies:</p>
              {updatedData?.hobbies?.options?.map((item, index) => (
                <span
                  key={index}
                  className="bg-gray-500 text-white py-2 px-3 rounded mr-2 first:ml-4 font-semibold"
                >
                  {item}
                </span>
              ))}
              <button
                onClick={() => setEdit2(!edit2)}
                type="button"
                className="app__buttons flex items-center gap-2"
              >
                <FiEdit2 /> Edit
              </button>
            </div>
            {edit2 ? (
              <div className="my-8">
                <Checkbox
                  title={"hobbies"}
                  data={hobbiesData}
                  updateData={setUpdatedData}
                />
              </div>
            ) : null}
          </div>

          {disabled ? (
            <p className="italic">
              Select 3 options each for character and hobbies.
            </p>
          ) : null}

          <button
            type="submit"
            disabled={disabled}
            className={`app__buttons ${
              disabled
                ? "cursor-not-allowed border-red-500 bg-red-500 text-white"
                : "cursor-pointer border-green-500 bg-green-500 text-white hover:bg-green-400 hover:border-green-400"
            }`}
          >
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateForm;
