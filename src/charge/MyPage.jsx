import { Box, Button, VStack, Text } from '@chakra-ui/react';
import UserInput from './components/Input';
import PasswordInput from './components/PasswordInput';
import ConnectType from './components/ConnectType';
import Header from './components/Header';

function MyPage() {
    return (
        <Box minH="100vh">
            <Header />
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                minH="100vh"
                bg="white"
                p={4}
                pt="60px"
            >
                <VStack spacing={4} width="400px">
                    <UserInput placeholder="아이디" />
                    <UserInput placeholder="E-mail" />
                    <PasswordInput placeholder="비밀번호" />
                    <PasswordInput placeholder="비밀번호 확인" />
                    <UserInput placeholder="주소입력" />
                    <ConnectType placeholder="커넥트타입" />
                    <Button colorScheme="gray" width="100%">정보수정</Button>
                </VStack>
                <Box width="100%" display="flex" justifyContent="flex-end" mt={4}>
                    <Text color="red.500">회원탈퇴</Text>
                </Box>
            </Box>
        </Box>
    );
}

export default MyPage;
