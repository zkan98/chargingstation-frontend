import { useState } from 'react';
import { Box, Button, VStack, Text, useToast } from '@chakra-ui/react';
import UserInput from './components/Input';
import PasswordInput from './components/PasswordInput';
import ConnectType from './components/ConnectType';
import ChooseOne from './components/ChooseOne';
import Address from './components/Address';

function Join() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    detailAddress: '',
    connectType: '',
    userType: 'option1',
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

  const handleAddressChange = (address) => {
    setFormData((prevData) => ({
      ...prevData,
      address: address,
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
      const response = await fetch('/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
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
        <Address setAddress={handleAddressChange} />
        <Box
          border="1px solid"
          borderColor="gray.300"
          borderRadius="md"
          p={2}
          width="100%"
        >
          <Text fontSize="md" color="gray.600">
            {formData.address || '기본 주소'}
          </Text>
        </Box>
        <UserInput
          placeholder="상세 주소"
          name="detailAddress"
          value={formData.detailAddress}
          onChange={handleChange}
        />
        <ConnectType
          placeholder="커넥트타입"
          name="connectType"
          value={formData.connectType}
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
