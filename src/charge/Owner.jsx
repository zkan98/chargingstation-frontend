import { useState } from 'react';
import { Box, Button, Flex, HStack, VStack } from '@chakra-ui/react';
import OwnerTable from './components/Table';
import OwnerInput from './components/Input';
import Header from './components/Header';
import ConnectType from './components/ConnectType';

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
          <ConnectType placeholder="커넥트타입" name="connector" value={inputValues.connector} onChange={handleInputChange} />
          <OwnerInput placeholder="요금" name="fee" value={inputValues.fee} onChange={handleInputChange} />
          <Button colorScheme="blue">추가</Button>
        </VStack>
      );
    } else {
      return <Box>Select an option from the navigation bar.</Box>;
    }
  };

  return (
    <Box minH="100vh">
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
        mt="80px"
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

export default Owner;