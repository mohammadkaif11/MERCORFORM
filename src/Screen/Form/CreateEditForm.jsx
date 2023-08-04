import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormContext from "../../Context/form/FormContext";
import axios from "axios";

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
} from "@chakra-ui/react";

import FormHeader from "./Component/FormHeader";

function CreateEditForm() {
  const FormState = useContext(FormContext);
  const { UpdateForm, CreateForm } = FormState;
  const navigate = useNavigate();
  const screens = ["formpage", "formresponse", "formsettings"];
  const [currentscreen, setCurrentscreen] = useState("formpage");
  const [isSmallerThan1024] = useMediaQuery("(max-width: 1024px)");
  const [maxwidth, setMaxwidth] = useState("");

  const [sendData, setSendData] = useState({});

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
    const formId = localStorage.getItem("formId");
    if (formId) {
      const endpointUrl = `http://localhost:5000/form/getbyid/${formId}`;
      const token = localStorage.getItem("token");
      if (Object.keys(sendData).length == 0) {
        console.log("api calling");
        const headers = {
          "auth-token": token,
          "Content-Type": "application/json",
        };
        axios
          .get(endpointUrl, { headers })
          .then((response) => {
            console.log(response.data.data);
            setSendData(response.data.data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    } else {
      if (Object.keys(sendData).length == 0) {
        setSendData({
          Obj: {
            name: "unknown name",
            title: "unknown title",
            description: "unknown description",
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
      }
    }
  }, [sendData]);

  const handleOnChangeObj = (event) => {
    const { name, value } = event.target;

    setSendData((prevState) => ({
      ...prevState,
      Obj: {
        ...prevState.Obj,
        [name]: value,
      },
    }));
  };

  const handleChange = (index, event) => {
    event.preventDefault();
    const { name, value, type } = event.target;

    setSendData((prevState) => {
      const newFields = [...prevState.fields];
      newFields[index].name = value;
      if (type === "file") {
        newFields[index][name] = event.target.files[0];
      } else {
        newFields[index][name] = value;
      }

      return {
        ...prevState,
        fields: newFields,
      };
    });
  };

  const handleOptionChange = (index, optionIndex, event) => {
    const { value } = event.target;
    setSendData((prevState) => {
      const newFields = [...prevState.fields];
      newFields[index].Options[optionIndex] = value;
      return {
        ...prevState,
        fields: newFields,
      };
    });
  };

  const handleAddField = () => {
    setSendData((prevState) => {
      const newFields = [...prevState.fields];
      newFields.push({
        Question: "",
        ResponseType: "text",
        Options: [],
        file: null,
        FileType: "",
        MaxLength: "",
        MaxSize: "",
        Value: "",
      });
      return {
        ...prevState,
        fields: newFields,
      };
    });
  };

  const handleAddOption = (index) => {
    setSendData((prevState) => {
      const newFields = [...prevState.fields];
      const options = [...prevState.fields[index].Options];
      options.push("");
      newFields[index].Options = options;
      return {
        ...prevState,
        fields: newFields,
      };
    });
    console.log(sendData);
  };

  const handleRemoveField = (index) => {
    setSendData((prevState) => {
      const newFields = [...prevState.fields];
      newFields.splice(index, 1);
      return {
        ...prevState,
        fields: newFields,
      };
    });
  };

  const handleRemoveOption = (index, optionIndex) => {
    setSendData((prevState) => {
      const newFields = [...prevState.fields];
      newFields[index].Options.splice(optionIndex, 1);
      return {
        ...prevState,
        fields: newFields,
      };
    });
  };

  //handle submit
  const handleSubmit = () => {
    let formId = localStorage.getItem("formId");
    if (formId) {
      sendData.formId = formId;
      UpdateForm(sendData);
    } else {
      CreateForm(sendData);
    }
  };

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
      <Box width={"100%"}>
        <Flex
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Card width={maxwidth} my={2}>
            <CardBody>
              <Stack direction={["row", "row"]}>
                <Button onClick={handleAddField}>Add row</Button>
                <Button onClick={handleSubmit}>Save form</Button>
              </Stack>
            </CardBody>
          </Card>
          <Card
            width={maxwidth}
            style={{ borderTop: "4px solid #319795" }}
            my={2}
          >
            {Object.keys(sendData).length > 0 && (
              <CardBody>
                <Input
                  type="text"
                  fontSize={22}
                  fontWeight={400}
                  lineHeight={1.25}
                  letterSpacing={0}
                  value={sendData?.Obj.name}
                  name="name"
                  my={1}
                  onChange={handleOnChangeObj}
                />
                <Input
                  type="text"
                  fontSize={27}
                  fontWeight={400}
                  lineHeight={1.25}
                  letterSpacing={0}
                  value={sendData?.Obj.title}
                  name="title"
                  my={1}
                  onChange={handleOnChangeObj}
                />
                <Input
                  type="text"
                  fontSize={14}
                  fontWeight={400}
                  fontFamily={"docs-Roboto"}
                  lineHeight={1.5}
                  letterSpacing={0}
                  value={sendData?.Obj.description}
                  name="description"
                  my={1}
                  onChange={handleOnChangeObj}
                />
              </CardBody>
            )}
          </Card>
          {sendData?.fields?.map((field, index) => (
            <Card width={maxwidth} key={index} my={2}>
              <CardBody>
                <Flex justifyContent={"space-between"}>
                  <Input
                    type="text"
                    name="Question"
                    onChange={(event) => handleChange(index, event)}
                    value={field?.Question}
                    placeholder="Question"
                    w={"60%"}
                  />
                  <Select
                    placeholder="Select question type"
                    name="ResponseType"
                    value={field?.ResponseType}
                    onChange={(event) => handleChange(index, event)}
                    w={"25%"}
                  >
                    <option value="text">Text</option>
                    <option value="number">Number</option>
                    <option value="email">Email</option>
                    <option value="option">Option</option>
                    <option value="file">File</option>
                    {/* Add more field types as needed */}
                  </Select>
                </Flex>
                {field?.ResponseType === "option" && (
                  <Box my={2}>
                    {field?.Options.map((option, optionIndex) => (
                      <Box key={optionIndex} my={1}>
                        <Flex>
                          <Input
                            width={"30%"}
                            type="text"
                            placeholder={`Option ${optionIndex + 1}`}
                            value={option}
                            onChange={(event) =>
                              handleOptionChange(index, optionIndex, event)
                            }
                          />
                          <Button
                            mx={2}
                            type="button"
                            onClick={() =>
                              handleRemoveOption(index, optionIndex)
                            }
                          >
                            Remove Option
                          </Button>
                        </Flex>
                      </Box>
                    ))}
                    <Button
                      type="button"
                      onClick={() => handleAddOption(index)}
                      my={2}
                    >
                      Add Option
                    </Button>
                  </Box>
                )}
                {field?.ResponseType === "file" && (
                  <Box my={2}>
                    <Box>
                      <Text>File Type</Text>
                      <Input
                        type="text"
                        name="FileType"
                        placeholder="Allowed File Types (e.g., image/*, audio/*, application/pdf)"
                        value={field?.FileType}
                        onChange={(event) => handleChange(index, event)}
                      />
                    </Box>
                    <Box>
                      <Text>File Size</Text>
                      <Input
                        type="text"
                        name="MaxLength"
                        placeholder="Maximum File Size (e.g., 2MB)"
                        value={field?.MaxLength}
                        onChange={(event) => handleChange(index, event)}
                      />
                    </Box>
                  </Box>
                )}
                {field?.ResponseType === "text" && (
                  <Box my={2}>
                    <Text>Maximum Character value</Text>
                    <Input
                      type="text"
                      name="MaxSize"
                      placeholder="Maximum Number of Characters"
                      value={field?.MaxSize}
                      onChange={(event) => handleChange(index, event)}
                    />
                  </Box>
                )}
                <Box my={2}>
                  <Button onClick={() => handleRemoveField(index)}>
                    Remove row
                  </Button>
                </Box>
              </CardBody>
            </Card>
          ))}
        </Flex>
      </Box>
    </>
  );
}

export default CreateEditForm;
