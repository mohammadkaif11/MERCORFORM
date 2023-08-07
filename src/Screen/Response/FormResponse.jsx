import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import FormContext from "../../Context/form/FormContext";
import { useGoogleLogin } from "@react-oauth/google";

import axios from "axios";
import {
  Flex,
  Stack,
  CardBody,
  Card,
  Text,
  Box,
  Button,
  useMediaQuery,
} from "@chakra-ui/react";

function FormResponse() {
  let params = useParams();
  const FormState = useContext(FormContext);
  const { addingFormResponse } = FormState;
  const [sendData, setSendData] = useState({});
  const [maxwidth, setMaxwidth] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isSmallerThan1024] = useMediaQuery("(max-width: 1024px)");

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

  //useEffect for set current senddata ,error message,user email
  useEffect(() => {
    let localStorageEmail = localStorage.getItem("email");
    if (userEmail == ""  ) {
      if (localStorageEmail) {
        setUserEmail(localStorageEmail);
      }
    }
    if (userEmail != "") {
      const responseId = params.id;
      const endpointUrl = `https://mercorformbackend.onrender.com/form/getform/${responseId}`;
      if (Object.keys(sendData).length == 0 && errorMsg === "") {
        const body = {
          email: userEmail,
        };
        const headers = {
          "Content-Type": "application/json",
        };
        axios
          .post(endpointUrl, body, { headers })
          .then((response) => {
            if (response.data.data != null) {
              console.log(response.data.data)
              setSendData(response.data.data);
            } else {
              console.log(response.data.data)
              setErrorMsg(response.data.Msg);
            }
          })
          .catch((error) => {
            alert(error.message);
            console.error("Error:", error);
          });
      }
    }
    
    //remove gmail
   return ()=>{
      let localStorageEmail = localStorage.getItem("email");
      if (localStorageEmail){
        localStorage.removeItem("email");
        setUserEmail("");
      }
    }
  }, [sendData, errorMsg, userEmail]);


  

  //handle change value
  const handleChange = (index, event) => {
    event.preventDefault();
    const { name, value, type } = event.target;
    setSendData((prevState) => {
      const newFields = [...prevState.fields];
      if (type === "file") {
        newFields[index].file = event.target.files[0];
      } else {
        newFields[index].Value = value;
      }
      return {
        ...prevState,
        fields: newFields,
      };
    });
  };

  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const responseId = params.id;
    if(userEmail==""){
     alert("Please enter_email");
    }else{
      sendData.email = userEmail;
      addingFormResponse(sendData, responseId);
      setSendData({})
    }
  };

  //Login with Google
  const LoginForReponse = useGoogleLogin({
    onSuccess: (user) => {
      if (user.access_token != null) {
        axios
          .get(
            `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
            {
              headers: {
                Authorization: `Bearer ${user.access_token}`,
                Accept: "application/json",
              },
            }
          )
          .then((res) => {
            if (res) {
              localStorage.setItem("email", res.data.email);
              setUserEmail(res.data.email);
            }
          })
          .catch((err) => console.log("Error :", err));
      }
    },
    onError: (error) => {
      console.log("Login Failed:", error);
    },
  });

  //Upload file and get unique link
  const UploadFile = async (index) => {
    if (sendData.fields[index].file != null) {
      const endpointUrl = "https://mercorformbackend.onrender.com/form/upload";
      const formData = new FormData();
      formData.append("file", sendData.fields[index].file);

      try {
        const res = await axios.post(endpointUrl, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setSendData((prevState) => {
          const newFields = [...prevState.fields];
          newFields[index].Value = res.data.imageUrl;

          return {
            ...prevState,
            fields: newFields,
          };
        });

      } catch (err) {
        alert(err.message);
        console.error("Failed to upload image:", err);
      }
    }
  };

  return (
    <>
      {userEmail === "" ? (
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
              <Button onClick={() => LoginForReponse()}>
                Choose response email
              </Button>
            </Card>
          </Flex>
        </Box>
      ) : Object.keys(sendData).length > 0 ? (
        <Box width={"100%"}>
          <form onSubmit={handleSubmit}>
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
                {userEmail.length > 0 && (
                  <Text fontSize={20} color={"red.300"} fontWeight={500} m={1}>
                    {userEmail}
                  </Text>
                )}
                {Object.keys(sendData).length > 0 && (
                  <CardBody>
                    <Text
                      fontSize={27}
                      fontWeight={400}
                      lineHeight={1.25}
                      letterSpacing={0}
                    >
                      {sendData?.Obj.title}
                    </Text>
                    <Text
                      fontSize={27}
                      fontWeight={400}
                      lineHeight={1.25}
                      letterSpacing={0}
                    >
                      {sendData?.Obj.description}
                    </Text>
                  </CardBody>
                )}
              </Card>
              {sendData?.fields?.map((field, index) => (
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
                          required={true}
                          style={{
                            border: "1px solid black",
                            width: "90%",
                            padding: "5px",
                            fontSize: "1.2rem",
                          }}
                          name="Value"
                          value={field?.Value}
                          onChange={(event) => handleChange(index, event)}
                          size="lg"
                        >
                          {field?.Options?.map((option, index) => (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : field?.ResponseType === "file" ? (
                        <>
                          <Box>
                            <input
                              required={true}
                              size="lg"
                              style={{
                                border: "1px solid black",
                                width: "90%",
                                padding: "5px",
                                fontSize: "1.2rem",
                              }}
                              type="file"
                              name="file"
                              onChange={(event) => handleChange(index, event)}
                            />

                            {field?.Value != "" && (
                              <Text>File Upload Completed</Text>
                            )}
                          </Box>
                          <Button
                            onClick={() => {
                              UploadFile(index);
                            }}
                            m={2}
                          >
                            Upload
                          </Button>
                        </>
                      ) : (
                        <input
                          required={true}
                          style={{
                            border: "1px solid black",
                            width: "90%",
                            padding: "5px",
                            fontSize: "1.2rem",
                          }}
                          type={field?.ResponseType}
                          name={field?.ResponseType}
                          value={field?.Value}
                          onChange={(event) => handleChange(index, event)}
                        />
                      )}
                    </Box>
                  </CardBody>
                </Card>
              ))}

              <Card width={maxwidth} my={2}>
                <CardBody>
                  <Stack direction={["row", "row"]}>
                    <Button type="submit">Submit Form</Button>
                  </Stack>
                </CardBody>
              </Card>
            </Flex>
          </form>
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
              style={{ borderTop: "4px solid purple" }}
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
                  {errorMsg}
                </Text>
              </CardBody>
            </Card>
          </Flex>
        </Box>
      )}
    </>
  );
}

export default React.memo(FormResponse);
