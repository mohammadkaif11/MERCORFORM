import FormContext from "./FormContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FormState = (props) => {
  const [currentObjFilled, setCurrentObjFilled] = useState({
    Obj: {
      name: "",
      title: "",
      description: "",
    },
    fields: [
      {
        Question: "",
        ResponseType: "",
        Options: [],
        file: null,
        FileType: "",
        MaxLength: "",
        MaxSize: "",
        Value: "",
      },
    ],
  });
  const [recentForms, setRecentForm] = useState([]);
  const [name, setName] = useState(null);
  const [formSetting, setFormSetting] = useState({});

  //Create Form data
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

        //Save it to localStorage
        GetFormDataById(response.data.data._id);
        console.log("Response:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    console.log("Create Form called");
    console.log(data);
  };

  //Update Form data
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

        //Save data in local storage and get update form data
        GetFormDataById(response.data.data._id);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    console.log("Update Form called");
    console.log(data);
  };

  //GetById form data and save it in local storage for data persistence
  const GetFormDataById = (Id) => {
    console.log("call GetFormDataById function");
    const endpointUrl = `http://localhost:5000/form/getbyid/${Id}`;
    const token = localStorage.getItem("token");

    const headers = {
      "auth-token": token,
      "Content-Type": "application/json",
    };

    axios
      .get(endpointUrl, { headers })
      .then((response) => {
        setCurrentObjFilled(response.data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  //Create Form data
  const GetRecentForms = () => {
    const endpointUrl = "http://localhost:5000/form/getrecentForms";
    const token = localStorage.getItem("token");
    const headers = {
      "auth-token": token,
      "Content-Type": "application/json",
    };
    axios
      .get(endpointUrl, { headers })
      .then((response) => {
        console.log("Response:", response.data);
        setRecentForm(response.data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    console.log("Get Recents Form called");
  };

  //GetName
  const GetName = () => {
    const endpointUrl = "http://localhost:5000/form/getName";
    const token = localStorage.getItem("token");
    const headers = {
      "auth-token": token,
      "Content-Type": "application/json",
    };
    axios
      .get(endpointUrl, { headers })
      .then((response) => {
        console.log("Response:", response.data);
        setName(response.data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    console.log("Get Recents Form called");
  };

  //GetById form data and save it in local storage for data persistence
  const GetFormSetting = (Id) => {
    
    const endpointUrl = `http://localhost:5000/form/getformsetting/${Id}`;
    const token = localStorage.getItem("token");

    const headers = {
      "auth-token": token,
      "Content-Type": "application/json",
    };

    axios
      .get(endpointUrl, { headers })
      .then((response) => {
        let obj = {
          allTimeAccess: false,
          startDateTime: "",
          endDateTime: "",
          status: false,
          access: "",
        };
        if (
          response.data.data.Start_Datetime === null ||
          response.data.data.End_Datetime === null
        ) {
          obj.allTimeAccess = true;
        } else {
          obj.allTimeAccess = false;
        }
        obj.startDateTime =
          response.data.data.Start_Datetime === null
            ? ""
            : response.data.data.Start_Datetime;
        obj.endDateTime =
          response.data.data.End_Datetime === null
            ? ""
            : response.data.data.End_Datetime;
        obj.status = response.data.data.Status;
        obj.access = JSON.stringify(response.data.data.Access);
        setFormSetting(obj);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <FormContext.Provider
      value={{
        CreateForm,
        UpdateForm,
        GetFormDataById,
        currentObjFilled,
        GetRecentForms,
        recentForms,
        name,
        GetName,
        GetFormSetting,
        formSetting,
      }}
    >
      {props.children}
    </FormContext.Provider>
  );
};
export default FormState;
