import { Box, Button, VStack, Text, Flex, HStack } from '@chakra-ui/react';
import UserInput from './components/UserInput';
import PasswordInput from './components/PasswordInput';
import ConnectType from './components/ConnectType';

function Header() {
    return (
        <Flex
            bg="white"
            p={4}
            borderBottom="1px solid #e2e8f0"
            align="center"
            justify="space-between"
            width="100%"
            zIndex={1}
            position="fixed"
            top={0}
            left={0}
        >
            <Text fontSize="xl" fontWeight="bold" ml={3}>7team</Text>
            <HStack spacing={4}>
                <Button colorScheme="gray" variant="outline">로그아웃</Button>
            </HStack>
        </Flex>
    );
}

function MyPage() {
    return (
        <Box>
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
