import React from "react";
import FormWrapper from "../FormWrapper";
import { characterData, hobbiesData } from "../data";

const ThirdForm = ({
  updateFields,
  checkedCharacterState,
  setCheckedCharacterState,
  checkedHobbiesState,
  setCheckedHobbiesState,
}) => {
  const handleOnChange = ({
    data,
    position,
    checkedState,
    setCheckedState,
  }) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);

    const selectedOptions = [];

    updatedCheckedState.map((item, index) => {
      if (item === true) selectedOptions.push(data[index]);
    });

    if (data === characterData)
      return updateFields({ character: selectedOptions });

    if (data === hobbiesData) return updateFields({ hobbies: selectedOptions });
  };

  return (
    <FormWrapper title="Account Creation">
      <h2>Character</h2>
      <div className="grid grid-cols-3 gap-4">
        {characterData.map((item, index) => (
          <div key={index}>
            <input
              type="checkbox"
              id={`character-checkbox-${index}`}
              value={item}
              checked={checkedCharacterState[index]}
              onChange={() =>
                handleOnChange({
                  data: characterData,
                  position: index,
                  checkedState: checkedCharacterState,
                  setCheckedState: setCheckedCharacterState,
                })
              }
            />
            <label htmlFor={`character-checkbox-${index}`} className="ml-2">
              {item}
            </label>
          </div>
        ))}
      </div>

      <h2>Hobbies</h2>
      <div className="grid grid-cols-3 gap-4">
        {hobbiesData.map((item, index) => (
          <div key={index}>
            <input
              type="checkbox"
              id={`hobbies-checkbox-${index}`}
              value={item}
              checked={checkedHobbiesState[index]}
              onChange={() =>
                handleOnChange({
                  data: hobbiesData,
                  position: index,
                  checkedState: checkedHobbiesState,
                  setCheckedState: setCheckedHobbiesState,
                })
              }
            />
            <label htmlFor={`hobbies-checkbox-${index}`} className="ml-2">
              {item}
            </label>
          </div>
        ))}
      </div>
    </FormWrapper>
  );
};

export default ThirdForm;
