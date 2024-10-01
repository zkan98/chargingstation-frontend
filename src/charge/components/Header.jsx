// src/components/Header.jsx
import { useState, useEffect } from 'react';
import { Flex, HStack, Button, Image, useToast, Spinner } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from "../../api/axiosInstance.js";
import elecsearch from '../../assets/elecsearch.png';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null); // 사용자 역할을 저장할 상태 추가
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const token = localStorage.getItem('accessToken'); // Access Token을 로컬 스토리지에서 가져옴
    if (token) {
      setIsLoggedIn(true);

      // 로컬 스토리지에서 사용자 정보를 가져와서 역할을 확인
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user && user.role) {
          setUserRole(user.role);
        } else {
          console.error('User role not found in localStorage');
        }
      } else {
        console.error('User data not found in localStorage');
      }
    } else {
      setIsLoggedIn(false); // 토큰이 없으면 로그아웃 상태로 설정
    }
    setIsLoading(false); // 로딩 완료
  }, []);

  const handleLogout = async () => {
    const accessToken = localStorage.getItem('accessToken'); // Access Token을 로컬 스토리지에서 가져옴

    // 토큰이 없거나 만료된 경우 로그인 페이지로 리다이렉트
    if (!accessToken) {
      navigate('/login');
      return;
    }

    try {
      // 로그아웃 API 호출
      await axiosInstance.post(
          `/users/logout`,
          {},
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
      );

      // 성공적으로 로그아웃 후 로컬 스토리지에서 토큰 및 사용자 정보 삭제
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');

      toast({
        title: '로그아웃 성공',
        description: '성공적으로 로그아웃되었습니다.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      navigate('/login'); // 로그인 페이지로 리다이렉트
    } catch (err) {
      console.error('Error during logout:', err);

      // 에러 발생 시 로컬 스토리지에서 토큰 및 사용자 정보 삭제
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');

      toast({
        title: '로그아웃 실패',
        description: '로그아웃 중 오류가 발생했습니다.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });

      navigate('/login'); // 로그인 페이지로 리다이렉트
    }
  };

  if (isLoading) {
    return (
        <Flex
            bg="white"
            p={4}
            borderBottom="1px solid #e2e8f0"
            align="center"
            justify="center"
            width="100%"
            zIndex={1}
            height="70px"
        >
          <Spinner size="xl" />
        </Flex>
    );
  }

  return (
      <Flex
          bg="white"
          p={4}
          borderBottom="1px solid #e2e8f0"
          align="center"
          justify="space-between"
          width="100%"
          zIndex={1}
          height="70px"
      >
        <Link to="/">
          <Image src={elecsearch} alt="Electric Search" objectFit="contain" maxHeight="70px" />
        </Link>
        <HStack spacing={4}>
          {isLoggedIn ? (
              <>
                {userRole === 'ROLE_BUSINESS' && (
                    <Button as={Link} to="/owner" colorScheme="blue" variant="outline">
                      사업자 관리
                    </Button>
                )}
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
