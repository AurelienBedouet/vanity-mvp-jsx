import React, { useEffect, useState, useContext } from "react";
import FirstStep from "./Steps/FirstStep";
import SecondStep from "./Steps/SecondStep";
import ThirdStep from "./Steps/ThirdStep";
import useMultiStepForm from "./useMultiStepForm";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from "../../utils/firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { UserContext } from "../../context/UserContext";
import { useRouter } from "next/router";

const INITIAL_DATA = {
  username: "",
  avatar: "",
  age: "",
  sexe: "",
  city: "",
  zone: "",
  profession: "",
  ethnicity: "",
  character: {
    options: [],
    isValid: false,
  },
  hobbies: {
    options: [],
    isValid: false,
  },
};

const MultiStepForm = ({ setShow }) => {
  const { user } = useContext(UserContext);

  const router = useRouter();

  const [formData, setFormData] = useState(INITIAL_DATA);

  const [disabled, setDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(true);

  useEffect(() => {
    if (
      formData.character.isValid === true &&
      formData.hobbies.isValid === true
    ) {
      setDisabled(false);
    } else setDisabled(true);
  }, [formData.character.isValid, formData.hobbies.isValid]);

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultiStepForm([
      <FirstStep
        key={1}
        {...formData}
        updateFields={setFormData}
        setNextDisabled={setNextDisabled}
      />,
      <SecondStep key={2} {...formData} updateFields={setFormData} />,
      <ThirdStep key={3} updateFields={setFormData} />,
    ]);

  const onSubmit = async e => {
    e.preventDefault();

    if (!isLastStep) return next();

    await setDoc(doc(db, "users", user?.uid), {
      createdAt: serverTimestamp(),
      basicInfo: {
        ...formData,
      },
    });

    toast.success("Profile successfully created! 🚀 ");
    setShow(false);
    router.push("/profile");
  };

  return (
    <div className="relative bg-white rounded-lg xs:px-2 ss:px-4 py-4 w-full mx-auto">
      <form onSubmit={onSubmit}>
        <div className="absolute top-[-1rem] left-[50%] transform translate-x-[-50%]">
          {currentStepIndex + 1} / {steps.length}
        </div>
        {step}
        <div className="mt-4 flex gap-2 justify-end">
          {!isFirstStep && (
            <button type="button" onClick={back} className="app__buttons">
              Back
            </button>
          )}
          {isLastStep ? (
            <button
              type="submit"
              disabled={disabled}
              className={`app__buttons ${
                disabled
                  ? "cursor-not-allowed border-red-500 bg-red-500 text-white"
                  : "cursor-pointer border-green-500 bg-green-500 text-white hover:bg-green-400 hover:border-green-400"
              }`}
            >
              Finish
            </button>
          ) : (
            <button
              type="submit"
              disabled={nextDisabled}
              className={`app__buttons ${
                nextDisabled
                  ? "cursor-not-allowed border-red-500 bg-red-500 text-white"
                  : "cursor-pointer border-green-500 bg-green-500 text-white hover:bg-green-400 hover:border-green-400"
              }`}
            >
              Next
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default MultiStepForm;
