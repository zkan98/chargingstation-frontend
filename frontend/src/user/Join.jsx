import { Box, Button, VStack, Text } from '@chakra-ui/react';
import UserInput from './components/UserInput';
import PasswordInput from './components/PasswordInput';
import ConnectType from './components/ConnectType';

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
        <UserInput placeholder="E-mail" />
        <PasswordInput placeholder="비밀번호" />
        <PasswordInput placeholder="비밀번호 확인" />
        <ConnectType placeholder="커넥트타입" />
        <br />
        <Button colorScheme="blue" width="100%">회원가입</Button>
      </VStack>
    </Box>
  );
}

export default Login;