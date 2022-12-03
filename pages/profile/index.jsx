import React, { useState, useContext } from "react";
import MultiStepForm from "../../components/MultiStepForm";
import UpdateProfile from "./UpdateProfile";
import { UserContext } from "../../context/UserContext";
import { AiOutlineClose } from "react-icons/ai";
import { GoCalendar } from "react-icons/go";
import moment from "moment/moment";

const Profile = () => {
  const { userData } = useContext(UserContext);
  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow(!show);
  };

  return (
    <div>
      {userData ? (
        <>
          <div className="flex items-center justify-between gap-4 mb-8">
            <h1 className="text-2xl font-semibold text-gray-700">
              Your Profile
            </h1>
            <div className="flex items-center gap-8 bg-gray-500 text-white max-w-max py-2 px-3 rounded shadow-lg">
              <span>{userData.username}</span>
              <span className="flex items-center gap-4">
                <GoCalendar size={24} /> Joined in{" "}
                {moment(userData.createdAt).format("MMM YYYY")}
              </span>
            </div>
          </div>
          <button onClick={toggleShow} type="button" className="app__buttons">
            Update profile
          </button>
          {show ? (
            <>
              <div className="absolute top-0 right-0 w-screen h-screen bg-gray-500/50 backdrop-blur-sm z-10" />
              <div className="fixed top-[50%] left-[50%] transform translate-y-[-50%] translate-x-[-50%] max-w-3xl w-[95%] lg:w-full max-h-[95%] overflow-y-auto shadow-xl rounded-xl bg-white p-4 sm:p-8 md:p-12 z-20">
                <button
                  onClick={toggleShow}
                  type="button"
                  className="absolute top-2 right-2 rounded-full border p-3 z-10 text-gray-700 hover:bg-gray-700 hover:text-white"
                >
                  <AiOutlineClose size={20} />
                </button>
                <UpdateProfile setShow={setShow} />
              </div>
            </>
          ) : null}
        </>
      ) : (
        <>
          <h1>Create your profile</h1>
          <button onClick={toggleShow} type="button" className="app__buttons">
            Create profile
          </button>
          {show ? (
            <>
              <div className="absolute top-0 right-0 w-screen h-screen bg-gray-500/50 backdrop-blur-sm z-10" />
              <div className="fixed top-[50%] left-[50%] transform translate-y-[-50%] translate-x-[-50%] w-[95%] min-h-[660px] max-w-xl shadow-xl rounded-xl bg-white p-4 sm:p-8 md:p-12 z-20">
                <button
                  onClick={toggleShow}
                  type="button"
                  className="absolute top-2 right-2 rounded-full border p-3 z-10 text-gray-700 hover:bg-gray-700 hover:text-white"
                >
                  <AiOutlineClose />
                </button>
                <MultiStepForm setShow={setShow} />
              </div>
            </>
          ) : null}
        </>
      )}
    </div>
  );
};

export default Profile;
