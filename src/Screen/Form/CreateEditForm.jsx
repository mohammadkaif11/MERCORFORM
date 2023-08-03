import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormContext from "../../Context/form/FormContext";

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
} from "@chakra-ui/react";

import FormHeader from "./Component/FormHeader";

function CreateEditForm() {
  const FormState = useContext(FormContext);
  const { UpdateForm, CreateForm, GetFormDataById, currentObjFilled } =
    FormState;
  const navigate = useNavigate();
  const screens = ["formpage", "formresponse", "formsettings"];
  const [currentscreen, setCurrentscreen] = useState("formpage");

  const [fields, setFields] = useState([
    {
      Question: "Question",
      ResponseType: "text",
      Options: [],
      file: null,
      FileType: "",
      MaxLength: "",
      MaxSize: "",
      Value: "",
    },
  ]);

  const [Obj, setObj] = useState({
    name: "name",
    title: "untitle form",
    description: "undescription form",
  });

  
  //Useeffected Function--------------------------------
  useEffect(() => {
    let formId = localStorage.getItem("formId");
    if (formId) {
      GetFormDataById(formId);
      if (currentObjFilled.FormData) {
      let TempData=currentObjFilled;
        let data = {
          name: TempData.Name,
          title: TempData.Title,
          description: currentObjFilled.Description,
        };
        setObj(data);
        setFields(JSON.parse(currentObjFilled.FormData));
        console.log("Current Object Filled: ", currentObjFilled);
      }
    } else {
      setFields([
        {
          Question: "Question",
          ResponseType: "text",
          Options: [],
          file: null,
          FileType: "",
          MaxLength: "",
          MaxSize: "",
          Value: "",
        },
      ]);
      setObj({
        name: "name",
        title: "untitle form",
        description: "undescription form",
      });
    }
  }, []);

  const handleOnChangeObj = (event) => {
    const { name, value } = event.target;
    setObj((prevObject) => ({
      ...prevObject,
      [name]: value,
    }));
  };

  const handleChange = (index, event) => {
    event.preventDefault();
    const { name, value, type } = event.target;
    const newFields = [...fields];
    if (type === "file") {
      // Handle file uploads for file type fields
      newFields[index][name] = event.target.files[0];
    } else {
      newFields[index][name] = value;
    }
    setFields(newFields);
  };

  const handleOptionChange = (index, optionIndex, event) => {
    const { value } = event.target;
    const newFields = [...fields];
    newFields[index].Options[optionIndex] = value;
    setFields(newFields);
  };

  const handleAddField = () => {
    setFields([
      ...fields,
      {
        Question: "",
        ResponseType: "text",
        Options: [],
        file: null,
        FileType: "",
        MaxLength: "",
        MaxSize: "",
        Value: "",
      },
    ]);
  };

  const handleAddOption = (index) => {
    const newFields = [...fields];
    newFields[index].Options.push("");
    setFields(newFields);
  };

  const handleRemoveField = (index) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };

  const handleRemoveOption = (index, optionIndex) => {
    const newFields = [...fields];
    newFields[index].Options.splice(optionIndex, 1);
    setFields(newFields);
  };

  //handle submit
  const handleSubmit = () => {
    Obj.formData = fields;
    let formId = localStorage.getItem("formId");
    if (formId) {
      Obj.formId = formId;
      UpdateForm(Obj);
    } else {
      CreateForm(Obj);
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
          <Card width={"40%"} my={2}>
            <CardBody>
              <Stack direction={["row", "row"]}>
                <Button onClick={handleAddField}>Add row</Button>
                <Button onClick={handleSubmit}>Save form</Button>
              </Stack>
            </CardBody>
          </Card>
          <Card width={"40%"} style={{ borderTop: "4px solid #319795" }} my={2}>
            <CardBody>
              <Input
                type="text"
                font
                fontSize={22}
                fontWeight={400}
                lineHeight={1.25}
                letterSpacing={0}
                value={Obj.name}
                name="name"
                my={1}
                onChange={handleOnChangeObj}
              />
              <Input
                type="text"
                font
                fontSize={27}
                fontWeight={400}
                lineHeight={1.25}
                letterSpacing={0}
                value={Obj.title}
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
                value={Obj.description}
                name="description"
                my={1}
                onChange={handleOnChangeObj}
              />
            </CardBody>
          </Card>
          {fields.map((field, index) => (
            <Card width={"40%"} key={index} my={2}>
              <CardBody>
                <Flex justifyContent={"space-between"}>
                  <Input
                    type="text"
                    name="Question"
                    onChange={(event) => handleChange(index, event)}
                    value={field.Question}
                    placeholder="Question"
                    w={"60%"}
                  />
                  <Select
                    placeholder="Select option"
                    name="ResponseType"
                    value={field.ResponseType}
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
                {field.ResponseType === "option" && (
                  <Box my={2}>
                    {field.Options.map((option, optionIndex) => (
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
                {field.ResponseType === "file" && (
                  <Box my={2}>
                    <Box>
                      <Text>File Type</Text>
                      <Input
                        type="text"
                        name="FileType"
                        placeholder="Allowed File Types (e.g., image/*, audio/*, application/pdf)"
                        value={field.FileType}
                        onChange={(event) => handleChange(index, event)}
                      />
                    </Box>
                    <Box>
                      <Text>File Size</Text>
                      <Input
                        type="text"
                        name="MaxLength"
                        placeholder="Maximum File Size (e.g., 2MB)"
                        value={field.MaxLength}
                        onChange={(event) => handleChange(index, event)}
                      />
                    </Box>
                  </Box>
                )}
                {field.ResponseType === "text" && (
                  <Box my={2}>
                    <Text>Maximum Character value</Text>
                    <Input
                      type="text"
                      name="MaxSize"
                      placeholder="Maximum Number of Characters"
                      value={field.MaxSize}
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
