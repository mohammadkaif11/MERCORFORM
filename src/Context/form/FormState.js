import FormContext from "./FormContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FormState = (props) => {
  const [currentObjFilled,setCurrentObjFilled] = useState({});

  //Create Form
  const CreateForm = (data) => {
    const endpointUrl = "http://localhost:5000/form/create";
    const dataToSend = data;
    const token = localStorage.getItem("token");
    const headers = {
      "auth-token": token,
      "Content-Type": "application/json",
    };
    axios
      .post(endpointUrl, dataToSend, { headers })
      .then((response) => {
        localStorage.setItem("formId", response.data.data._id);
        console.log("Response:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    console.log("Create Form called");
    console.log(data);
  };

  //Update Form
  const UpdateForm = (data) => {
    const endpointUrl = "http://localhost:5000/form/update";
    const dataToSend = data;
    const token = localStorage.getItem("token");
    const headers = {
      "auth-token": token,
      "Content-Type": "application/json",
    };
    axios
      .post(endpointUrl, dataToSend, { headers })
      .then((response) => {
        console.log("Response:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    console.log("Update Form called");
    console.log(data);
  };

  //GetById
  function GetFormDataById(Id){
    console.log("Create edit form called");
    const endpointUrl = `http://localhost:5000/form/getbyid/${Id}`;
    const token = localStorage.getItem("token");

    const headers = {
      "auth-token": token,
      "Content-Type": "application/json",
    };

    axios
      .get(endpointUrl,{ headers })
      .then((response) => {
        let TempObj={
          name:response.data.data.Name,
          title:response.data.data.Title,
          description:response.data.data.Description,
        }
        //Set both in localStorage
        localStorage.setItem("object", JSON.stringify(TempObj));
        localStorage.setItem("filled", response.data.data.FormData);
        setCurrentObjFilled(response.data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <FormContext.Provider value={{ CreateForm, UpdateForm,GetFormDataById,currentObjFilled}}>
      {props.children}
    </FormContext.Provider>
  );
};
export default FormState;
