import { useState } from 'react';
import { Flex, HStack, Text, Button } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //const [userType, setUserType] = useState('user');  // 'user' 또는 'owner'
  const navigate = useNavigate();

  //const useEffect(() => {
  //  fetchUserData().then(data => setUserType(data.userType));
  //}, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('/logout', {
        method: 'POST', // 또는 'GET' 등 백엔드에 맞는 HTTP 메서드 사용
        credentials: 'include', // 쿠키를 포함해서 보낼 경우
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setIsLoggedIn(false);
        navigate('/');
      } else {
        console.error('Failed to log out');
      }
    } catch (error) {
      console.error('An error occurred during logout:', error);
    }
  };

  return (
    <Flex
      bg="white"
      p={4}
      borderBottom="1px solid #e2e8f0"
      align="center"
      justify="space-between"
      width="100%"
      zIndex={1}
    >
      <Text as={Link} to="/" fontSize="xl" fontWeight="bold" ml={3}>7team</Text>
      <HStack spacing={4}>
        {isLoggedIn ? (
          <>
          {/*
            {userType === 'owner' && (
              <Button as={Link} to="/owner" colorScheme="yellow" variant="outline">
                충전소관리
              </Button>
            )}
              */}
            <Button as={Link} to="/mypage" colorScheme="purple" variant="outline">
              마이페이지
            </Button>
            <Button onClick={handleLogout} colorScheme="gray" variant="outline">
              로그아웃
            </Button>
          </>
        ) : (
          <Button as={Link} to="/login" colorScheme="blue" variant="outline">
            로그인
          </Button>
        )}
      </HStack>
    </Flex>
  );
}

export default Header;

