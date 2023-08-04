import { Box, Button, Center, Flex } from "@chakra-ui/react";
import React from "react";

function FormHeader({ changeScreenFunction, screens, currentscreen,currentFormId}) {
  return (
    <Box
      bg={"#edf2f7"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      {currentscreen === screens[0] ? (
        <Button
          onClick={() => {
            changeScreenFunction(screens[0]);
          }}
          style={{ borderBottom: "4px solid black" }}
        >
          Question
        </Button>
      ) : (
        <Button
          onClick={() => {
            changeScreenFunction(screens[0]);
          }}
        >
          Question
        </Button>
      )}
      {currentscreen === screens[1] ? (
        <Button
          onClick={() => {
            changeScreenFunction(screens[1]);
          }}
          style={{ borderBottom: "4px solid black" }}
        >
          Response
        </Button>
      ) : (
        <Button
          onClick={() => {
            changeScreenFunction(screens[1]);
          }}
        >
          Repsonse
        </Button>
      )}

      {currentscreen === screens[2] ? (
        <Button
          onClick={() => {
            changeScreenFunction(screens[2]);
          }}
          style={{ borderBottom: "4px solid black" }}
        >
          Setting
        </Button>
      ) : (
        <Button
          onClick={() => {
            changeScreenFunction(screens[2]);
          }}
        >
          Setting
        </Button>
      )}
    </Box>
  );
}

export default FormHeader;
