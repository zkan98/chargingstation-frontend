import { Box, Flex, HStack, Input, Text } from '@chakra-ui/react';
import CustomMenu from './components/CustomMenu';
import Header from './components/Header';

function Navbar() {
  const menuItems = {
    '커넥터': ['Type1', 'Type2'],
    '충전속도': ['10'],
    '충전요금': ['100'],
    '주차요금': ['100','200'],
    '장소': ['공공기관'],
    '사업자': ['ABC']
  };

  return (
    <Flex
      bg="white"
      p={4}
      borderBottom="1px solid #e2e8f0"
      align="center"
      width="100%"
      zIndex={1}
    >
      <HStack spacing={4} ml={3}>
        {Object.keys(menuItems).map((menu) => (
          <CustomMenu
            key={menu}
            buttonText={menu}
            menuItems={menuItems[menu]}
          />
        ))}
      </HStack>
    </Flex>
  );
}


function SearchBar() {
  return (
    <Box
      p={4}
      width="400px"
      bg="white"
      borderRadius="md"
      boxShadow="md"
      position="absolute"
      top="20px"
      left="20px"
      zIndex={2}
    >
      <Input placeholder="충전소 검색" size="lg" />
    </Box>
  );
}

function InfoCard() {
  return (
    <Box
      p={4}
      bg="white"
      boxShadow="md"
      borderRadius="md"
      width="400px"
      position="absolute"
      top="100px"
      left="20px"
      zIndex={2}
    >
      <Text fontWeight="bold" mt={2}>충전소 정보 카드</Text>
    </Box>
  );
}

function MapView() {
  return (
    <Box position="relative" width="100%" height="calc(100vh - 60px)" bg="gray.200">
      <Text position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">
        지도
      </Text>
    </Box>
  );
}

function MainPage() {
  return (
    <Box minH="100vh" bg="gray.100">
      <Header />
      <Navbar />
      <Box position="relative">
        <MapView />
        <SearchBar />
        <InfoCard />
      </Box>
    </Box>
  );
}

export default MainPage;