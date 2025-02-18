import { useContext, useEffect } from "react";
import React from "react";
import {
  Box,
  Flex,
  Card,
  CardBody,
  Button,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import FormContext from "../../Context/form/FormContext";
import Navbar from "../../Component/Navbar";

function FormHome() {
  const FormState = useContext(FormContext);
  const { GetRecentForms, recentForms } = FormState;
  const navigate = useNavigate();


  useEffect(() => {
    let token = localStorage.getItem("token");
    const formId = localStorage.getItem("formId");

    if (!token) {
      navigate("/login");
    }
    if (token) {
      GetRecentForms();
    }

    if (formId) {
      localStorage.removeItem("formId");
      localStorage.removeItem("object");
      localStorage.removeItem("filled");
    }
  }, []);

  const CreateNewForm = () => {
    navigate("/formpage");
  };

  const OpenRecentForm = (formId) => {
    localStorage.setItem("formId", formId);
    navigate("/formpage");
  };

  return (
    <>
      <Navbar />
      <Box width={"100%"} height={300} bg={"blackAlpha.100"}>
        <Flex
          flexDirection={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          height={"100%"}
        >
          <Card width={"250px"}>
            <Text m={1} textAlign={"center"}>
              Create new form
            </Text>
            <CardBody textAlign={"center"}>
              <i
                onClick={() => {
                  CreateNewForm();
                }}
                style={{ fontSize: "60px" }}
                className="bi bi-file-plus"
              ></i>
            </CardBody>
            <Text m={1} textAlign={"center"}>
              Blank template
            </Text>
          </Card>
        </Flex>
      </Box>
      <Box>
        <Text m={5}>Recent Form</Text>
        <SimpleGrid minChildWidth={"200px"} spacing={2}>
          {recentForms.length > 0 &&
            recentForms.map((form, index) => {
              return (
                <Box
                  m={2}
                  key={index}
                  h="300"
                  bg="blue.500"
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Button
                    m={2}
                    onClick={() => {
                      OpenRecentForm(form._id);
                    }}
                  >
                    {form.Name}
                  </Button>
                </Box>
              );
            })}
        </SimpleGrid>
      </Box>
    </>
  );
}

export default React.memo(FormHome);
