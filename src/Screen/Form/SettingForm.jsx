import { useState, useEffect, useContext } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import FormHeader from "./Component/FormHeader";
import FormContext from "../../Context/form/FormContext";
import axios from "axios";
import {
  Flex,
  CardBody,
  Card,
  Box,
  Input,
  Text,
  Switch,
  FormLabel,
  Button,
  Textarea,
  useMediaQuery,
} from "@chakra-ui/react";
import Navbar from "../../Component/Navbar";

function SettingForm() {
  const navigate = useNavigate();
  const screens = ["formpage", "formresponse", "formsettings"];
  const [currentscreen, setCurrentscreen] = useState("formsettings");
  const [isSmallerThan1024] = useMediaQuery("(max-width: 1024px)");
  const [maxwidth, setMaxwidth] = useState("");

  const [objState, setObjState] = useState({});

  const FormState = useContext(FormContext);
  const { updateFormSetting, updateFormStatus, deleteForm } = FormState;

  useEffect(() => {
    if (isSmallerThan1024) {
      if (maxwidth === "38%") {
        setMaxwidth("90%");
      }
    } else {
      setMaxwidth("38%");
    }
  }, [isSmallerThan1024]);

  useEffect(() => {
    let formId = localStorage.getItem("formId");
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }

    if (formId && token) {
      const endpointUrl = `http://localhost:5000/form/getformsetting/${formId}`;
      const token = localStorage.getItem("token");
      if (Object.keys(objState).length === 0) {
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
                : response.data.data.Start_Datetime.substring(0, 16);
            obj.endDateTime =
              response.data.data.End_Datetime === null
                ? ""
                : response.data.data.End_Datetime.substring(0, 16);
            obj.status = response.data.data.Status;
            obj.access = JSON.stringify(response.data.data.Access);
            setObjState(obj);
          })
          .catch((error) => {
            alert(error.message);
            console.error("Error:", error);
          });
      }
    } else {
      setObjState({
        allTimeAccess: false,
        startDateTime: "",
        endDateTime: "",
        status: false,
        access: "",
      });
    }
  }, [objState]);

  //------------------------------Change Screen Function----------------------------------
  const changeScreenFunction = (value) => {
    setCurrentscreen(value);
    navigate(`/${value}`);
  };

  //------------------------------Handle Switches Changes--------------------------------
  const handleSwitchChange = (key) => (e) => {
    if (key === "status") {
      let formId = localStorage.getItem("formId");
      if(formId){
        objState.status = e.target.checked;
        objState.formId = formId;
        updateFormStatus(objState);
      }else{
        alert('Not found')
      }
    }
    setObjState({ ...objState, [key]: e.target.checked });
  };

  //Handle Change Value
  const handleChange = (key) => (e) => {
    setObjState({ ...objState, [key]: e.target.value });
  };

  //Update form Settings
  const updateSettings = () => {
    let formId = localStorage.getItem("formId");
    if (formId) {
      objState.formId = formId;
      updateFormSetting(objState);
    } else {
      alert("not found");
    }
  };

  //Delete form
  const DeleteForm = () => {
    let formId = localStorage.getItem("formId");
    if (formId) {
      deleteForm(formId);
      navigate("/forms");
    } else {
      alert("Not found");
    }
  };

  return (
    <>
      <Navbar />
      <FormHeader
        changeScreenFunction={changeScreenFunction}
        screens={screens}
        currentscreen={currentscreen}
      />
      {Object.keys(objState).length > 0 && (
        <Box width={"100%"}>
          <Flex
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Card width={maxwidth} my={2}>
              <CardBody>
                <FormLabel htmlFor="email-alerts" mb="0">
                  All Time Access
                </FormLabel>
                <Switch
                  id="allTimeAccess"
                  isChecked={objState?.allTimeAccess}
                  onChange={handleSwitchChange("allTimeAccess")}
                  size="lg"
                  m={2}
                />
                <Text>Start Time</Text>
                <Input
                  type="datetime-local"
                  fontSize={22}
                  fontWeight={400}
                  lineHeight={1.25}
                  letterSpacing={0}
                  my={1}
                  value={objState?.startDateTime}
                  onChange={handleChange("startDateTime")}
                />
                <Text>End Time</Text>
                <Input
                  type="datetime-local"
                  fontSize={22}
                  fontWeight={400}
                  lineHeight={1.25}
                  letterSpacing={0}
                  value={objState?.endDateTime}
                  onChange={handleChange("endDateTime")}
                  my={1}
                />
                <Button
                  onClick={() => {
                    updateSettings();
                  }}
                  my={1}
                  colorScheme="purple"
                  size="lg"
                >
                  Save
                </Button>
              </CardBody>
            </Card>
            <Card width={maxwidth} my={2}>
              <CardBody>
                <FormLabel htmlFor="email-alerts" mb="0">
                  Open Responses
                </FormLabel>
                <Switch
                  isChecked={objState?.status}
                  onChange={handleSwitchChange("status")}
                  size="lg"
                  id="email-alerts"
                  m={2}
                />
              </CardBody>
            </Card>
            <Card width={maxwidth} my={2}>
              <CardBody>
                <FormLabel htmlFor="email-alerts" mb="0" my={1}>
                  Confirm to delete form
                </FormLabel>
                <Button
                    colorScheme="purple"
                    size="lg"
                  onClick={() => {
                    DeleteForm();
                  }}
                >
                  Delete
                </Button>
              </CardBody>
            </Card>
            <Card width={maxwidth} my={2}>
              <CardBody>
                <FormLabel htmlFor="email-alerts" mb="0">
                  Access User
                </FormLabel>{" "}
                <Textarea
                  m={2}
                  value={objState?.access}
                  onChange={handleChange("access")}
                  rows={4}
                  placeholder="Here is a sample placeholder"
                  size="sm"
                />
                <Button
                    colorScheme="purple"
                    size="lg"
                  onClick={() => {
                    updateSettings();
                  }}
                >
                  Update
                </Button>
              </CardBody>
            </Card>
          </Flex>
        </Box>
      )}
    </>
  );
}

export default React.memo(SettingForm);
