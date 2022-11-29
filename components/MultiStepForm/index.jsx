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
import { INITIAL_DATA } from "../../utils/data";
// import { useLocalStorage } from "../../hooks/useLocalStorage";

const MultiStepForm = ({ setShow }) => {
  const { user } = useContext(UserContext);

  const router = useRouter();

  const [formData, setFormData] = useState(INITIAL_DATA);

  // const [basicInfoLocalStorage, setBasicInfoLocalStorage] = useLocalStorage(
  //   "bascicInfo",
  //   INITIAL_DATA
  // );

  // const [checkedCharacterState, setCheckedCharacterState] = useState(
  //   new Array(characterData.length).fill(false)
  // );

  // const [checkedHobbiesState, setCheckedHobbiesState] = useState(
  //   new Array(hobbiesData.length).fill(false)
  // );

  // const [checkboxMessage, setCheckboxMessage] = useState("");
  const [disabled, setDisabled] = useState(true);

  // const updateFields = fields => {
  //   setFormData(prev => ({ ...prev, ...fields }));
  // };

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
      <FirstStep key={1} {...formData} updateFields={setFormData} />,
      <SecondStep key={2} {...formData} updateFields={setFormData} />,
      <ThirdStep
        key={3}
        {...formData}
        updateFields={setFormData}
        setDisabled={setDisabled}
        // checkedCharacterState={checkedCharacterState}
        // setCheckedCharacterState={setCheckedCharacterState}
        // checkedHobbiesState={checkedHobbiesState}
        // setCheckedHobbiesState={setCheckedHobbiesState}
      />,
    ]);

  // useEffect(() => {
  //   const checkboxErrors = (data1, data2) => {
  //     if (currentStepIndex === 2) {
  //       if (data1?.length > 3 || data2?.length > 3) {
  //         setCheckboxMessage("Max 3 options!");
  //         setDisabled(true);
  //       } else if (data1?.length < 3 || data2?.length < 3) {
  //         setCheckboxMessage("Select 3 options for each category");
  //         setDisabled(true);
  //       } else {
  //         setCheckboxMessage("");
  //         setDisabled(false);
  //       }
  //     }
  //   };

  //   checkboxErrors(formData.character, formData.hobbies);
  // }, [currentStepIndex, formData.character, formData.hobbies]);

  const onSubmit = async e => {
    e.preventDefault();

    if (!isLastStep) return next();

    await setDoc(doc(db, "users", user?.uid), {
      createdAt: serverTimestamp(),
      basicInfo: {
        ...formData,
      },
    });

    // setBasicInfoLocalStorage({ ...formData });

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
        {/* {checkboxMessage ? <p>{checkboxMessage}</p> : null} */}
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
            <button type="submit" className="app__buttons">
              Next
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default MultiStepForm;
