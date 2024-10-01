import { useState } from 'react';
import { Box, Button, VStack, Text, Image, useToast } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import UserInput from './components/Input';
import PasswordInput from './components/PasswordInput';
import elecsearch from '../assets/elecsearch.png';
import axiosInstance from '@/api/axiosInstance.js'; // axiosInstance 가져오기

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const toast = useToast();

    const handleLogin = async () => {
        try {
            const response = await axiosInstance.post('/users/login', { email, password }); // axiosInstance 사용

            const data = response.data;
            if (response.status === 200) {
                console.log('서버로부터 받은 데이터:', data);

                // 사용자 정보를 로컬 스토리지에 저장
                const user = {
                    email: data.email,
                    username: data.username, // username 추가
                    role: data.role,
                };
                localStorage.setItem('user', JSON.stringify(user));

                // **Access Token을 로컬 스토리지에 저장**
                localStorage.setItem('accessToken', data.accessToken);

                // **Refresh Token을 쿠키에 저장**
                document.cookie = `refreshToken=${data.refreshToken}; path=/;`;

                toast({
                    title: '로그인 성공',
                    description: '로그인되었습니다.',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                navigate('/'); // 홈 화면으로 리디렉션
            } else {
                toast({
                    title: '로그인 실패',
                    description: data.error || '로그인에 실패했습니다.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error('로그인 처리 중 오류 발생:', error);
            toast({
                title: '오류 발생',
                description: '로그인 처리 중 오류가 발생했습니다.',
                status: 'error',
                duration: 5000,
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
        >
            <VStack spacing={4} width="400px">
                <Image src={elecsearch} alt="Electric Search" objectFit="cover" />
                <UserInput
                    placeholder="이메일"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <PasswordInput
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button colorScheme="blue" width="100%" onClick={handleLogin}>
                    로그인
                </Button>
                <br />
                <Text mt={4}>일렉서치와 함께 하세요!</Text>
                <Button as={Link} to="/join" colorScheme="green" width="100%">
                    회원가입
                </Button>
            </VStack>
        </Box>
    );
}

export default Login;
