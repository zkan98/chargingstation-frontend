import { useState } from 'react';
import { Box, Button, VStack, Text, useToast } from '@chakra-ui/react';
import UserInput from './components/Input';
import PasswordInput from './components/PasswordInput';
import ConnectType from './components/ConnectType';

function Join() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    connectType: '',
  });

  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: '비밀번호가 일치하지 않습니다.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      // API 요청
      const response = await fetch('https://api.yourbackend.com/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('회원가입 실패');
      }

      // 성공 시 처리
      toast({
        title: '회원가입이 완료되었습니다.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      // 가입 성공 후 추가 작업 (예: 로그인 페이지로 이동)
    } catch (error) {
      toast({
        title: '회원가입 중 오류가 발생했습니다.',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minH="100vh"
      bg="white"
      as="form"
      onSubmit={handleSubmit}
    >
      <Text fontSize="36px">
        <span style={{ fontWeight: 'normal' }}>7team</span>
      </Text>
      <br />
      <br />
      <VStack spacing={4} width="400px">
        <UserInput
          placeholder="아이디"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <UserInput
          placeholder="E-mail"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <PasswordInput
          placeholder="비밀번호"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <PasswordInput
          placeholder="비밀번호 확인"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <UserInput
          placeholder="주소입력"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
        <ConnectType
          placeholder="커넥트타입"
          name="connectType"
          value={formData.connectType}
          onChange={handleChange}
        />
        <br />
        <Button colorScheme="blue" width="100%" type="submit">
          회원가입
        </Button>
      </VStack>
    </Box>
  );
}

export default Join;
