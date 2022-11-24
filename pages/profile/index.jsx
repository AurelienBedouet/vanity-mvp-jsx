import React, { useState, useContext } from "react";
import MultiStepForm from "../../components/MultiStepForm";
import UpdateProfile from "./UpdateProfile";
import { UserContext } from "../../context/UserContext";
import { AiOutlineClose } from "react-icons/ai";

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
          <h1>Profile Created</h1>
          <button onClick={toggleShow} type="button" className="app__buttons">
            Update profile
          </button>
          {show ? (
            <>
              <div className="absolute top-0 right-0 w-screen h-screen bg-gray-500/50 backdrop-blur-sm z-10" />
              <div className="fixed top-[50%] left-[50%] transform translate-y-[-50%] translate-x-[-50%] w-[95%] max-w-max shadow-xl rounded-xl bg-white p-4 sm:p-8 md:p-12 z-20">
                <button
                  onClick={toggleShow}
                  type="button"
                  className="absolute top-2 right-2 rounded-full border p-3 text-gray-700 hover:bg-gray-700 hover:text-white"
                >
                  <AiOutlineClose />
                </button>
                <UpdateProfile />
              </div>
            </>
          ) : null}
        </>
      ) : (
        <>
          <h1>Profile not created yet</h1>
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
