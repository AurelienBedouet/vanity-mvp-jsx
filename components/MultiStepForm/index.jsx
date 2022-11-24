import React, { useEffect, useState, useContext } from "react";
import FirstStep from "./Steps/FirstStep";
import SecondStep from "./Steps/SecondStep";
import ThirdStep from "./Steps/ThirdStep";
import useMultiStepForm from "./useMultiStepForm";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth, db } from "../../utils/firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { characterData, hobbiesData } from "./data";
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
  character: [],
  hobbies: [],
};

const MultiStepForm = ({ setShow }) => {
  const { user } = useContext(UserContext);

  const router = useRouter();

  const [formData, setFormData] = useState(INITIAL_DATA);

  const [checkedCharacterState, setCheckedCharacterState] = useState(
    new Array(characterData.length).fill(false)
  );

  const [checkedHobbiesState, setCheckedHobbiesState] = useState(
    new Array(hobbiesData.length).fill(false)
  );

  const [checkboxMessage, setCheckboxMessage] = useState("");
  const [disabled, setDisabled] = useState(false);

  const updateFields = fields => {
    setFormData(prev => ({ ...prev, ...fields }));
  };

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultiStepForm([
      <FirstStep key={1} {...formData} updateFields={updateFields} />,
      <SecondStep key={2} {...formData} updateFields={updateFields} />,
      <ThirdStep
        key={3}
        {...formData}
        updateFields={updateFields}
        checkedCharacterState={checkedCharacterState}
        setCheckedCharacterState={setCheckedCharacterState}
        checkedHobbiesState={checkedHobbiesState}
        setCheckedHobbiesState={setCheckedHobbiesState}
      />,
    ]);

  useEffect(() => {
    const checkboxErrors = (data1, data2) => {
      if (currentStepIndex === 2) {
        if (data1.length > 3 || data2.length > 3) {
          setCheckboxMessage("Max 3 options!");
          setDisabled(true);
        } else if (data1.length < 3 || data2.length < 3) {
          setCheckboxMessage("Select 3 options for each category");
          setDisabled(true);
        } else {
          setCheckboxMessage("");
          setDisabled(false);
        }
      }
    };

    checkboxErrors(formData.character, formData.hobbies);
  }, [currentStepIndex, formData.character, formData.hobbies]);

  const onSubmit = async e => {
    e.preventDefault();

    if (!isLastStep) return next();

    await setDoc(doc(db, "users", `${user?.uid}`), {
      createdAt: serverTimestamp(),
      basicInfo: {
        ...formData,
      },
    });

    toast.success("Profile successfully created! 🚀 ");

    setFormData(INITIAL_DATA);
    setCheckedCharacterState(new Array(characterData.length).fill(false));
    setCheckedHobbiesState(new Array(hobbiesData.length).fill(false));
    setShow(false);
    router.push("/profile");
  };

  return (
    <div className="relative bg-white rounded-lg p-8 m-4 w-full mx-auto">
      <form onSubmit={onSubmit}>
        <div className="absolute top-[-1rem] left-[50%] transform translate-x-[-50%]">
          {currentStepIndex + 1} / {steps.length}
        </div>
        {step}
        {checkboxMessage ? <p>{checkboxMessage}</p> : null}
        <div className="mt-4 flex gap-2 justify-end">
          {!isFirstStep && (
            <button
              type="button"
              onClick={back}
              className="border py-1 px-2 rounded-lg"
            >
              Back
            </button>
          )}
          {isLastStep ? (
            <button
              type="submit"
              disabled={disabled}
              className={`border py-1 px-2 rounded-lg ${
                disabled
                  ? "cursor-not-allowed bg-red-500 text-white"
                  : "cursor-pointer bg-green-500 text-white"
              }`}
            >
              Finish
            </button>
          ) : (
            <button type="submit" className="border py-1 px-2 rounded-lg">
              Next
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default MultiStepForm;
