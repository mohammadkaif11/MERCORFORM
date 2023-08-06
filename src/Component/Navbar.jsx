import {
  Box,
  Flex,
  HStack,
  Text,
  IconButton,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Links = ["Forms"];

const NavLink = (props) => {
  const { children } = props;

  return (
    <Box
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
    >
      <Link to={"/" + children}>{children}</Link>
    </Box>
  );
};

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const Logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  const GotoLoginSinginPage = () => {
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <>
      <Box bg={useColorModeValue("white.100", "white.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <Text fontFamily={'monospace'} fontSize={'30px'} color={'purple'}>MERCOR</Text>
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
              color={'purple'}
              fontSize={'20px'}
              fontFamily={'monospace'}
              
            >
              {Links.map((link) => (
                <NavLink  key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Stack spacing={4} direction="row" align="center">
              {!isLoggedIn ? (
                <>
                  <Button
                    colorScheme="purple"
                    size="md"
                    onClick={GotoLoginSinginPage}
                    fontFamily={'monospace'}
                  >
                    Login
                  </Button>
                  <Button
                    colorScheme="purple"
                    size="md"
                    onClick={GotoLoginSinginPage}
                    fontFamily={'monospace'}
                  >
                    Signup
                  </Button>
                </>
              ) : (
                <Button   colorScheme="purple"
                size="md"  
                fontFamily={'monospace'} onClick={Logout}>Logout</Button>
              )}
            </Stack>
          </Flex>
        </Flex>
        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}

export default React.memo(Navbar);
