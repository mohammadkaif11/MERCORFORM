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
      })
      .catch((error) => {
        alert(error.message);
        console.error("Error:", error);
      });
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
      .put(endpointUrl, dataToSend, { headers })
      .then((response) => {
        //Save data in local storage and get update form data
        GetFormDataById(response.data.data._id);
      })
      .catch((error) => {
        alert(error.message);
        console.error("Error:", error);
      });
  };

  //GetById form data and save it in local storage for data persistence
  const GetFormDataById = (Id) => {
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
        alert(error.message);
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
        setRecentForm(response.data.data);
      })
      .catch((error) => {
        alert(error.message);
        console.error("Error:", error);
      });
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
        setName(response.data.data);
      })
      .catch((error) => {
        alert(error.message);
        console.error("Error:", error);
      });
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
        alert(error.message);
        console.error("Error:", error);
      });
  };

  //Updating form settings
  const updateFormSetting = (obj) => {
    const endpointUrl = "http://localhost:5000/form/updateformsetting";
    const dataToSend = obj;
    const token = localStorage.getItem("token");
    const headers = {
      "auth-token": token,
      "Content-Type": "application/json",
    };
    axios
      .put(endpointUrl, dataToSend, { headers })
      .then((response) => {})
      .catch((error) => {
        alert(error.message);
        console.error("Error:", error);
      });
  };

  //update form Status
  const updateFormStatus = (obj) => {
    const endpointUrl = "http://localhost:5000/form/updateformstatus";
    const dataToSend = obj;
    const token = localStorage.getItem("token");
    const headers = {
      "auth-token": token,
      "Content-Type": "application/json",
    };
    axios
      .put(endpointUrl, dataToSend, { headers })
      .then((response) => {})
      .catch((error) => {
        alert(error.message);
        console.error("Error:", error);
      });
  };

  //delete form
  const deleteForm = (formId) => {
    const endpointUrl = `http://localhost:5000/form/deleteform/${formId}`;
    const token = localStorage.getItem("token");
    const headers = {
      "auth-token": token,
      "Content-Type": "application/json",
    };
    axios
      .delete(endpointUrl, { headers })
      .then((response) => {})
      .catch((error) => {
        alert(error.message);
        console.error("Error:", error);
      });
  };

  //update form Status
  const addingFormResponse = (obj, responseId) => {
    const endpointUrl = `http://localhost:5000/form/addformresponse/${responseId}`;
    const dataToSend = obj;
    const token = localStorage.getItem("token");
    const headers = {
      "auth-token": token,
      "Content-Type": "application/json",
    };
    axios
      .post(endpointUrl, dataToSend, { headers })
      .then((response) => {})
      .catch((error) => {
        alert(error.message);
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
        updateFormSetting,
        updateFormStatus,
        deleteForm,
        addingFormResponse,
      }}
    >
      {props.children}
    </FormContext.Provider>
  );
};
export default FormState;
