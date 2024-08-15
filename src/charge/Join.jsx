import { useState } from 'react';
import { Box, Button, VStack, Text, useToast, Image } from '@chakra-ui/react';
import UserInput from './components/Input';
import PasswordInput from './components/PasswordInput';
import ChooseOne from './components/ChooseOne';
import elecsearch from '../assets/elecsearch.png';

function Join() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'option1'
  });

  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUserTypeChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      userType: value,
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

    // formData를 userDto로 변환
        const userDto = {
          email: formData.email,
          password: formData.password,
          username: formData.username,
          address: formData.address || null,
          phoneNumber: formData.phoneNumber || null,
          connectorType: formData.connectType || null,
          isAdmin: false
        };


    try {
      const response = await fetch('http://localhost:8080/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDto),
      });

      if (!response.ok) {
        throw new Error('회원가입 실패');
      }

      toast({
        title: '회원가입이 완료되었습니다.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
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
      <VStack spacing={4} width="400px">
      <Image src={elecsearch} alt="Electric Search" objectFit="cover"/>
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
        
        <ChooseOne value={formData.userType} onChange={handleUserTypeChange} />
        <br />
        <Button colorScheme="blue" width="100%" type="submit">
          회원가입
        </Button>
      </VStack>
    </Box>
  );
}

export default Join;
