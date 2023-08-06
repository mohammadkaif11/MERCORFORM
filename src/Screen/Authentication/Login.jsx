import {
  Flex,
  Box,
  Stack,
  Button,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react'

import { useContext,useEffect } from 'react';
import React from 'react';
import UserContext from '../../Context/User/UserContext'
import Navbar from '../../Component/Navbar';
 function Login() {
    const UserState = useContext(UserContext);
    const {Login,user,PostUserDetails}=UserState;
      
    useEffect(() => {
       if(user){
           PostUserDetails();
       }
    }, [user])
    
    const ButtonLoginOnClick=()=>{
        Login();
    }

  return (
    <>
    <Navbar/>
    <Flex
      minH={'100vh'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <Stack spacing={10}>
              <Button
                bg={'purple.400'}
                colorScheme="purple"
                onClick={ButtonLoginOnClick}
                >
                Sig in with Google
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
    </>
  )
}

export default React.memo(Login);
