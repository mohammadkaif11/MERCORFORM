import React from "react";
import {
  Box,
  Flex,
  Card,
  CardBody,
  Stack,
  Button,
  Text,
  Container,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function FormHome() {
  const navigate = useNavigate();
  
  const CreateNewForm = () => {
    let formId = localStorage.getItem("formId");
    if (formId) {
      localStorage.removeItem("formId");
    }
    navigate("/formpage");
  };

  return (
    <>
      <Box width={"100%"} height={250} bg={"blackAlpha.100"}>
        <Flex
          flexDirection={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          height={"100%"}
        >
          <Card width={"15%"}>
            <Text m={1} textAlign={"center"}>
              Create new form
            </Text>
            <CardBody textAlign={"center"}>
              <i
                onClick={() => {
                  CreateNewForm();
                }}
                style={{ fontSize: "60px" }}
                class="bi bi-file-plus"
              ></i>
            </CardBody>
            <Text m={1} textAlign={"center"}>
              Blank template
            </Text>
          </Card>
        </Flex>
      </Box>
      <Box>
        <Text marginLeft={5}>Recent Form</Text>
        <Grid templateColumns="repeat(5, 1fr)" gap={6} m={5}>
          <GridItem w="100%" h="150" bg="blue.500">
            Form1
          </GridItem>
          <GridItem w="100%" h="150" bg="blue.500">
            Form2
          </GridItem>
          <GridItem w="100%" h="150" bg="blue.500">
            Form3
          </GridItem>
          <GridItem w="100%" h="150" bg="blue.500">
            Form3
          </GridItem>
          <GridItem w="100%" h="150" bg="blue.500">
            Form3
          </GridItem>
          <GridItem w="100%" h="150" bg="blue.500">
            Form3
          </GridItem>
          <GridItem w="100%" h="150" bg="blue.500">
            Form3
          </GridItem>
          <GridItem w="100%" h="150" bg="blue.500">
            Form3
          </GridItem>
          <GridItem w="100%" h="150" bg="blue.500">
            Form3
          </GridItem>
          <GridItem w="100%" h="150" bg="blue.500">
            Form3
          </GridItem>
        </Grid>
      </Box>
    </>
  );
}

export default FormHome;
