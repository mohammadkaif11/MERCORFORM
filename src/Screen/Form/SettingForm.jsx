import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormHeader from "./Component/FormHeader";

function SettingForm() {
  const navigate = useNavigate();
  const screens = ["formpage", "formresponse", "formsettings"];

  const [currentscreen, setCurrentscreen] = useState("formsettings");

  //------------------------------Change Screen Function----------------------------------
  const changeScreenFunction = (value) => {
    setCurrentscreen(value);
    navigate(`/${value}`);
  };

  return (
    <>
      <FormHeader
        changeScreenFunction={changeScreenFunction}
        screens={screens}
        currentscreen={currentscreen}
      />
    </>
  );
}

export default SettingForm;
