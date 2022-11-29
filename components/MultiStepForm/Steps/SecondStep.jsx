import React from "react";
import FormWrapper from "../FormWrapper";

const SecondStep = ({ city, zone, profession, ethnicity, updateFields }) => {
  return (
    <FormWrapper title="Address">
      <div className="flex flex-col xs:flex-row items-center justify-between w-full">
        <label
          htmlFor="city"
          className="block w-full xs:max-w-[92px] mb-4 xs:mb-0 text-center xs:text-left"
        >
          City
        </label>
        <input
          type="text"
          value={city || ""}
          onChange={e =>
            updateFields(prev => ({ ...prev, city: e.target.value }))
          }
          autoFocus
          required
          id="city"
          className="w-full xs:w-[80%] rounded"
        />
      </div>

      <div className="flex flex-col xs:flex-row items-center justify-between w-full">
        <label
          htmlFor="zone"
          className="block w-full xs:max-w-[92px] mb-4 xs:mb-0 text-center xs:text-left"
        >
          Zone
        </label>
        <select
          value={zone || ""}
          id="zone"
          onChange={e =>
            updateFields(prev => ({ ...prev, zone: e.target.value }))
          }
          required
          className="w-full xs:w-[80%] rounded"
        >
          <option value="" disabled>
            Select an option...
          </option>
          <option value="urban">Urban</option>
          <option value="rural">Rural</option>
          <option value="suburban">Suburban</option>
        </select>
      </div>

      <div className="flex flex-col xs:flex-row items-center justify-between w-full">
        <label
          htmlFor="profession"
          className="block w-full xs:max-w-[92px] mb-4 xs:mb-0 text-center xs:text-left"
        >
          Profession
        </label>
        <select
          value={profession || ""}
          id="profession"
          onChange={e =>
            updateFields(prev => ({ ...prev, profession: e.target.value }))
          }
          required
          className="w-full xs:w-[80%] rounded"
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

      <div className="flex flex-col xs:flex-row items-center justify-between w-full">
        <label
          htmlFor="ethnicity"
          className="block w-full xs:max-w-[92px] mb-4 xs:mb-0 text-center xs:text-left"
        >
          ethnicity
        </label>
        <select
          value={ethnicity || ""}
          id="ethnicity"
          onChange={e =>
            updateFields(prev => ({ ...prev, ethnicity: e.target.value }))
          }
          required
          className="w-full xs:w-[80%] rounded"
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
    </FormWrapper>
  );
};

export default SecondStep;
