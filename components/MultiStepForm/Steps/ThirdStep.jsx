import React from "react";
import FormWrapper from "../FormWrapper";
import Checkbox from "../../Checkbox";
import { characterData, hobbiesData } from "../../../utils/data";

const ThirdForm = ({ updateFields }) => {
  return (
    <FormWrapper title="Account Creation">
      <Checkbox
        title={"character"}
        data={characterData}
        updateData={updateFields}
      />
      <Checkbox
        title={"hobbies"}
        data={hobbiesData}
        updateData={updateFields}
      />
    </FormWrapper>
  );
};

export default ThirdForm;
