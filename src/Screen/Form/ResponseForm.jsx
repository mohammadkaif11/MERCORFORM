import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormHeader from "./Component/FormHeader";

function ResponseForm() {
  const navigate = useNavigate();
  const screens = ["formpage", "formresponse", "formsettings"];

  const [currentscreen, setCurrentscreen] = useState("formresponse");

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

export default ResponseForm;
