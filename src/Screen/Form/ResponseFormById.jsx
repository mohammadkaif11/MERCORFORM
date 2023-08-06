import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Flex,
  CardBody,
  Card,
  Text,
  Box,
  Button,
  useMediaQuery,
} from "@chakra-ui/react";
import FormHeader from "./Component/FormHeader";
import Navbar from "../../Component/Navbar";

function ResponseFormById() {
  const [isSmallerThan1024] = useMediaQuery("(max-width: 1024px)");
  const [maxwidth, setMaxwidth] = useState("");
  const [response, setResponse] = useState([]);
  const screens = ["formpage", "formresponse", "formsettings"];
  const [currentscreen, setCurrentscreen] = useState("formresponse");

  const params = useParams();
  const navigate = useNavigate();

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

  //useEffect for getting current response of user
  useEffect(() => {
    const endpointUrl = `http://localhost:5000/form/getanswerbyid/${params.id}`;
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    const headers = {
      "auth-token": token,
      "Content-Type": "application/json",
    };
    axios
      .get(endpointUrl, { headers })
      .then((response) => {
        let formData = response.data.data.FormData;
        console.log(JSON.parse(formData));
        setResponse(JSON.parse(formData));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  //------------------------------Change Screen Function----------------------------------
  const changeScreenFunction = (value) => {
    setCurrentscreen(value);
    navigate(`/${value}`);
  };

  //-------------------------------download file----------------------------------
  const Downloadfile = (value) => {
    if (Object.keys(value).length == 0) {
      alert("Not have file");
    } else {
      const downloadUrl = `${value}`;
      window.open(downloadUrl);
    }
  };

  return (
    <>
      <Navbar />
      <FormHeader
        changeScreenFunction={changeScreenFunction}
        screens={screens}
        currentscreen={currentscreen}
      />{" "}
      {response.length > 0 ? (
        <Box width={"100%"}>
          <Flex
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            {response?.map((field, index) => (
              <Card width={maxwidth} key={index} my={2}>
                <CardBody>
                  <Text>{field?.Question}</Text>

                  {field?.ResponseType === "option" && (
                    <Box my={2}>
                      <Text>Select a option</Text>
                    </Box>
                  )}

                  {field?.ResponseType === "file" && (
                    <Box my={2}>
                      <Box>
                        {field?.FileType !== "" && (
                          <>
                            <Text>File Type</Text>
                            <Text>{field?.FileType}</Text>
                          </>
                        )}
                      </Box>
                      <Box>
                        {field?.FileType !== "" && (
                          <>
                            <Text>File Size</Text>
                            <Text>{field?.MaxLength}</Text>
                          </>
                        )}
                      </Box>
                    </Box>
                  )}
                  {field?.ResponseType === "text" && (
                    <Box my={2}>
                      {field?.MaxSize !== "" && (
                        <>
                          <Text>Maximum Character value</Text>
                          <Text>{field?.MaxSize}</Text>
                        </>
                      )}
                    </Box>
                  )}
                  <Box my={2}>
                    {field?.ResponseType === "option" &&
                    field?.Options?.length > 0 ? (
                      <select
                        isReadOnly
                        style={{
                          border: "1px solid black",
                          width: "90%",
                          padding: "5px",
                          fontSize: "1.2rem",
                        }}
                        name="Value"
                        value={field?.Value}
                        size="lg"
                      >
                        {field?.Options?.map((option, index) => (
                          <option isReadOnly key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : field?.ResponseType === "file" ? (
                      <>
                        <input
                          isReadOnly
                          size="lg"
                          style={{
                            border: "1px solid black",
                            width: "90%",
                            padding: "5px",
                            fontSize: "1.2rem",
                          }}
                          type={field?.ResponseType}
                          name={field?.ResponseType}
                        />
                        <Button
                          m={2}
                          onClick={() => {
                            Downloadfile(field?.Value);
                          }}
                        >
                          Dwonload file
                        </Button>
                      </>
                    ) : (
                      <input
                        isReadOnly
                        style={{
                          border: "1px solid black",
                          width: "90%",
                          padding: "5px",
                          fontSize: "1.2rem",
                        }}
                        type={field?.ResponseType}
                        name={field?.ResponseType}
                        value={field?.Value}
                      />
                    )}
                  </Box>
                </CardBody>
              </Card>
            ))}
          </Flex>
        </Box>
      ) : (
        <Box width={"100%"}>
          <Flex
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Card
              width={maxwidth}
              style={{ borderTop: "4px solid #319795" }}
              my={2}
            >
              <CardBody>
                <Text
                  fontSize={27}
                  fontWeight={400}
                  lineHeight={1.25}
                  letterSpacing={0}
                  color={"red"}
                >
                  Not Found
                </Text>
              </CardBody>
            </Card>
          </Flex>
        </Box>
      )}
    </>
  );
}

export default React.memo(ResponseFormById);
