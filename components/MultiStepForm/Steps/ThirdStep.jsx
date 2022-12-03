import React from "react";
import FormWrapper from "../FormWrapper";
import Checkbox from "../../Checkbox";
import { characterData, hobbiesData } from "../../../utils/data";

const ThirdForm = ({ updateFields }) => {
  return (
    <FormWrapper title="Profile 3">
      <div>
        <p className="text-center mb-4 font-semibold text-lg">Character</p>
        <Checkbox
          title={"character"}
          data={characterData}
          updateData={updateFields}
        />
      </div>
      <div className="mt-4">
        <p className="text-center mb-4 font-semibold text-lg">Hobbies</p>
        <Checkbox
          title={"hobbies"}
          data={hobbiesData}
          updateData={updateFields}
        />
      </div>
    </FormWrapper>
  );
};

export default ThirdForm;
