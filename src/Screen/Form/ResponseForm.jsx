import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormHeader from "./Component/FormHeader";
import React from "react";
import {
  Center,
  Container,
  Flex,
  HStack,
  Select,
  VStack,
  Stack,
  CardBody,
  Card,
  Text,
  Box,
  Button,
  Input,
  useMediaQuery,
  useClipboard,
} from "@chakra-ui/react";
import axios from "axios";
import Navbar from "../../Component/Navbar";

function ResponseForm() {
  const navigate = useNavigate();
  const screens = ["formpage", "formresponse", "formsettings"];
  const [isSmallerThan1024] = useMediaQuery("(max-width: 1024px)");
  const [maxwidth, setMaxwidth] = useState("");
  const [currentscreen, setCurrentscreen] = useState("formresponse");

  //totalResponses and Responses
  const [totalResponse, setTotalResponse] = useState(0);
  const [responses, setResponses] = useState([]);

  //------------------------------Change Screen Function----------------------------------
  const changeScreenFunction = (value) => {
    setCurrentscreen(value);
    navigate(`/${value}`);
  };

  //useEffect for set device-width
  useEffect(() => {
    if (isSmallerThan1024) {
      if (maxwidth === "38%") {
        setMaxwidth("90%");
      }
    } else {
      setMaxwidth("38%");
    }
  }, [isSmallerThan1024]);

  //Use Effect for api Call
  useEffect(() => {
    let formId = localStorage.getItem("formId");
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    if (formId && token) {
      const endpointUrl = `https://mercorformbackend.onrender.com/form/getallresponse/${formId}`;
      const token = localStorage.getItem("token");
      if (responses.length == 0 && totalResponse == 0) {
        const headers = {
          "auth-token": token,
          "Content-Type": "application/json",
        };
        axios
          .get(endpointUrl, { headers })
          .then((response) => {
            setResponses(response.data.data);
            setTotalResponse(response.data.data.length);
          })
          .catch((error) => {
            alert(error.message);
            console.error("Error:", error);
          });
      }
    }
  }, []);

  //OpenForm reponse
  const OpenForm = (Id) => {
    if (Id) {
      navigate(`/formresponse/${Id}`);
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
      <Box width={"100%"}>
        <Flex
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Card
            width={maxwidth}
            style={{ borderTop: "4px solid purple" }}
            my={2}
          >
            <CardBody>
              <Text>TotalResponse-{totalResponse}</Text>
            </CardBody>
          </Card>
          {responses.length > 0 ? (
            responses.map((response, index) => (
              <Card
                key={index}
                width={maxwidth}
                style={{ border: "4px solid purple" }}
                my={2}
              >
                <CardBody>
                  <Text>{response.UserEmail}</Text>
                  <Text>{response.CreatedDate}</Text>
                  <Button
                    onClick={() => {
                      OpenForm(response._id);
                    }}
                  >
                    Open Reponse
                  </Button>
                </CardBody>
              </Card>
            ))
          ) : (
            <Card
              width={maxwidth}
              style={{ borderTop: "4px solid purple" }}
              my={2}
            >
              <CardBody>
                <Text>No Response is found</Text>
              </CardBody>
            </Card>
          )}
        </Flex>
      </Box>
    </>
  );
}

export default React.memo(ResponseForm);
