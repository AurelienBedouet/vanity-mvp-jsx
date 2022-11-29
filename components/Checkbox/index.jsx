import React, { useState } from "react";

const Checkbox = ({ title, data, updateData }) => {
  const [checkboxMessage, setCheckboxMessage] = useState("");

  const [checkedState, setCheckedState] = useState(
    new Array(data?.length).fill(false)
  );

  const handleOnChange = ({ position }) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);

    const selectedOptions = [];

    updatedCheckedState.map((item, index) => {
      if (item === true) selectedOptions.push(data[index]);
    });

    if (title === "character") {
      if (selectedOptions.length > 3) {
        setCheckboxMessage("Max 3 options!");
        return updateData(prev => ({
          ...prev,
          character: { options: selectedOptions, isValid: false },
        }));
      } else if (selectedOptions.length < 3) {
        setCheckboxMessage("Select 3 options");
        return updateData(prev => ({
          ...prev,
          character: { options: selectedOptions, isValid: false },
        }));
      } else {
        setCheckboxMessage("");
        return updateData(prev => ({
          ...prev,
          character: { options: selectedOptions, isValid: true },
        }));
      }
    } else {
      if (selectedOptions.length > 3) {
        setCheckboxMessage("Max 3 options!");
        return updateData(prev => ({
          ...prev,
          hobbies: { options: selectedOptions, isValid: false },
        }));
      } else if (selectedOptions.length < 3) {
        setCheckboxMessage("Select 3 options");
        return updateData(prev => ({
          ...prev,
          hobbies: { options: selectedOptions, isValid: false },
        }));
      } else {
        setCheckboxMessage("");
        return updateData(prev => ({
          ...prev,
          hobbies: { options: selectedOptions, isValid: true },
        }));
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-4">
        {data?.map((item, index) => (
          <div key={index}>
            <input
              type="checkbox"
              id={`${title}-checkbox-${index}`}
              value={item || ""}
              checked={checkedState[index]}
              onChange={() => handleOnChange({ position: index })}
            />
            <label htmlFor={`${title}-checkbox-${index}`} className="ml-2">
              {item}
            </label>
          </div>
        ))}
      </div>
      {checkboxMessage ? (
        <span className="mt-4 bg-cyan-500 text-white px-3 py-2 rounded max-w-max">
          {checkboxMessage}
        </span>
      ) : null}
    </div>
  );
};

export default Checkbox;
