import { useState } from 'react';
import { Box, Button, Flex, VStack, Text, Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import OwnerTable from './components/OwnerTable';
import OwnerInput from './components/Input';
import Header from './components/Header';
import ConnectType from './components/ConnectType';
import Address from './components/Address';
import Parking from './components/Parking';

const initialChargingStationList = [
  { id: 1, name: 'Station1', address: '서울 영등포구 가마산로 323 상세주소', connector: 'Type1', slot: '10 chargers' },
  { id: 2, name: 'Station2', address: 'Location2', connector: 'Type2', slot: '20 chargers' }
];

const Owner = () => {
  const [selectedView, setSelectedView] = useState('chargingStationList');
  const [chargingStations, setChargingStations] = useState(initialChargingStationList);
  const [inputValues, setInputValues] = useState({
    id: null, // For identifying the item
    name: '',
    address: '',
    detailAddress: '',
    price: '',
    slot: '',
    connector: '',
    speed: '',
    fee: '',
    parkingFee: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handleAddressChange = (address) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      address: address
    }));
  };

  const handleParkingFeeChange = (value) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      parkingFee: value
    }));
  };

  const handleEdit = (item) => {
    setInputValues({
      id: item.id,
      name: item.name,
      address: item.address,
      detailAddress: '', // Example
      price: '', // Example
      slot: item.slot,
      connector: item.connector,
      speed: '', // Example
      fee: '', // Example
      parkingFee: '' // Example
    });
    setSelectedView('editChargingStation');
  };

  const handleDelete = (item) => {
    setChargingStations(prevStations =>
      prevStations.filter(station => station.id !== item.id)
    );
  };

  const handleSubmit = () => {
    if (inputValues.id) {
      // Update existing station
      setChargingStations(prevStations =>
        prevStations.map(station =>
          station.id === inputValues.id ? { ...inputValues } : station
        )
      );
    } else {
      // Add new station
      setChargingStations(prevStations => [
        ...prevStations,
        { id: Date.now(), ...inputValues }
      ]);
    }
    setSelectedView('chargingStationList');
  };

  const renderContent = () => {
    if (selectedView === 'chargingStationList') {
      return (
        <OwnerTable
          data={chargingStations}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      );
    } else if (selectedView === 'addChargingStation') {
      return (
        <Flex align="center" justify="center" width="100%" height="100%" p={4}>
          <VStack spacing={4} width="400px" bg="white" p={4} borderRadius="md">
            <OwnerInput placeholder="충전소명" name="name" value={inputValues.name} onChange={handleInputChange} />
            <Address setAddress={handleAddressChange} />
            <Box border="1px solid" borderColor="gray.300" borderRadius="md" p={2} width="100%">
              <Text fontSize="md" color="gray.600">
                {inputValues.address || '기본 주소'}
              </Text>
            </Box>
            <OwnerInput placeholder="상세 주소" name="detailAddress" value={inputValues.detailAddress} onChange={handleInputChange} />
            <OwnerInput placeholder="kWh당 가격" name="price" value={inputValues.price} onChange={handleInputChange} />
            <OwnerInput placeholder="슬롯 수" name="slot" value={inputValues.slot} onChange={handleInputChange} />
            <ConnectType placeholder="커넥트타입" name="connector" value={inputValues.connector} onChange={handleInputChange} />
            <OwnerInput placeholder="충전속도" name="speed" value={inputValues.speed} onChange={handleInputChange} />
            <OwnerInput placeholder="충전요금" name="fee" value={inputValues.fee} onChange={handleInputChange} />
            <Parking value={inputValues.parkingFee} onChange={handleParkingFeeChange} />
            <Button colorScheme="blue" onClick={handleSubmit}>
              {inputValues.id ? '수정' : '추가'}
            </Button>
          </VStack>
        </Flex>
      );
    } else if (selectedView === 'editChargingStation') {
      return (
        <Flex align="center" justify="center" width="100%" height="100%" p={4}>
          <VStack spacing={4} width="400px" bg="white" p={4} borderRadius="md">
            <OwnerInput placeholder="충전소명" name="name" value={inputValues.name} onChange={handleInputChange} />
            <Address setAddress={handleAddressChange} />
            <Box border="1px solid" borderColor="gray.300" borderRadius="md" p={2} width="100%">
              <Text fontSize="md" color="gray.600">
                {inputValues.address || '기본 주소'}
              </Text>
            </Box>
            <OwnerInput placeholder="상세 주소" name="detailAddress" value={inputValues.detailAddress} onChange={handleInputChange} />
            <OwnerInput placeholder="kWh당 가격" name="price" value={inputValues.price} onChange={handleInputChange} />
            <OwnerInput placeholder="슬롯 수" name="slot" value={inputValues.slot} onChange={handleInputChange} />
            <ConnectType placeholder="커넥트타입" name="connector" value={inputValues.connector} onChange={handleInputChange} />
            <OwnerInput placeholder="충전속도" name="speed" value={inputValues.speed} onChange={handleInputChange} />
            <OwnerInput placeholder="충전요금" name="fee" value={inputValues.fee} onChange={handleInputChange} />
            <Parking value={inputValues.parkingFee} onChange={handleParkingFeeChange} />
            <Button colorScheme="blue" onClick={handleSubmit}>
              수정
            </Button>
          </VStack>
        </Flex>
      );
    } else {
      return <Box></Box>;
    }
  };

  return (
    <Box minH="100vh">
      <Header />
      <Tabs
        isFitted
        variant='enclosed'
        onChange={(index) => {
          setSelectedView(index === 0 ? 'chargingStationList' : (index === 1 ? 'addChargingStation' : 'editChargingStation'));
        }}
      >
        <TabList mb='1em'>
          <Tab>충전소 목록</Tab>
          <Tab>충전소 추가</Tab>
          <Tab>충전소 수정</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {selectedView === 'chargingStationList' && renderContent()}
          </TabPanel>
          <TabPanel>
            {selectedView === 'addChargingStation' && renderContent()}
          </TabPanel>
          <TabPanel>
            {selectedView === 'editChargingStation' && renderContent()}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Owner;
