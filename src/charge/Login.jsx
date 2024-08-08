import { Box, Button, VStack, Text } from '@chakra-ui/react';
import UserInput from './components/Input';
import PasswordInput from './components/PasswordInput';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minH="100vh"
      bg="white"
    >
      <Text fontSize="36px"><span style={{ fontWeight: 'normal' }}>7team</span></Text>
      <br />
      <br />
      <VStack spacing={4} width="400px">
        <UserInput placeholder="아이디" />
        <PasswordInput placeholder="비밀번호" />
        <Button colorScheme="green" width="100%">로그인</Button>
        <br />
        <Text mt={4}>우리와 함께 하세요!</Text>
        <Button as={Link} to="/join" colorScheme="blue" width="100%">회원가입</Button>
      </VStack>
    </Box>
  );
}

export default Login;