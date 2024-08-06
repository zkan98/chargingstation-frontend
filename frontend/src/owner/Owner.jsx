import { useState } from 'react';
import { Box, Button, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import OwnerTable from './components/OwnerTable';
import OwnerInput from './components/OwnerInput';

const chargingStationList = [
  { from: 'Station1', to: 'Location1', factor: '10 chargers' },
  { from: 'Station2', to: 'Location2', factor: '20 chargers' }
];

const Owner = () => {
  const [selectedView, setSelectedView] = useState('');
  const [inputValues, setInputValues] = useState({
    name: '',
    address: '',
    price: '',
    latitude: '',
    longitude: '',
    connector: '',
    fee: ''
  });

  const handleButtonClick = (view) => {
    setSelectedView(view);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  const renderContent = () => {
    if (selectedView === 'chargingStationList') {
      return <OwnerTable data={chargingStationList} caption="Charging Station List" />;
    } else if (selectedView === 'addChargingStation') {
      return (
        <VStack spacing={4} width="400px">
          <OwnerInput placeholder="이름" name="name" value={inputValues.name} onChange={handleInputChange} />
          <OwnerInput placeholder="주소" name="address" value={inputValues.address} onChange={handleInputChange} />
          <OwnerInput placeholder="가격" name="price" value={inputValues.price} onChange={handleInputChange} />
          <OwnerInput placeholder="위도" name="latitude" value={inputValues.latitude} onChange={handleInputChange} />
          <OwnerInput placeholder="경도" name="longitude" value={inputValues.longitude} onChange={handleInputChange} />
          <OwnerInput placeholder="커넥터" name="connector" value={inputValues.connector} onChange={handleInputChange} />
          <OwnerInput placeholder="요금" name="fee" value={inputValues.fee} onChange={handleInputChange} />
          <Button colorScheme="blue">추가</Button>
        </VStack>
      );
    } else {
      return <Box>Select an option from the navigation bar.</Box>;
    }
  };

  return (
    <Box>
      <Header />
      <Flex
        bg="gray.100"
        p={4}
        borderBottom="1px solid #e2e8f0"
        align="center"
        justify="center"
        width="100%"
        zIndex={1}
        mb={4}
        mt="80px" // Add top margin to avoid overlap with the fixed header
      >
        <HStack spacing={8}>
          <Button onClick={() => handleButtonClick('chargingStationList')}>충전소목록</Button>
          <Button onClick={() => handleButtonClick('addChargingStation')}>충전소추가</Button>
        </HStack>
      </Flex>
      <Box p={4}>
        {renderContent()}
      </Box>
    </Box>
  );
};

const Header = () => {
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
      boxShadow="md" // Optional: Adds shadow for better visual separation
    >
      <Text fontSize="xl" fontWeight="bold" ml={3}>7team</Text>
      <HStack spacing={4}>
        <Button colorScheme="gray" variant="outline">로그아웃</Button>
      </HStack>
    </Flex>
  );
};

export default Owner;