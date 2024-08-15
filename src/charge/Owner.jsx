import { useState, useEffect } from 'react';
import { Box, Button, Flex, VStack, Text, Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import axios from 'axios';
import OwnerTable from './components/OwnerTable';
import OwnerInput from './components/Input';
import Header from './components/Header';
import ConnectType from './components/ConnectType';
import Address from './components/Address';
import Parking from './components/Parking';
import UploadCertificates from './components/UploadCertificates';

const Owner = () => {
  const [selectedView, setSelectedView] = useState('chargingStationList');
  const [chargingStations, setChargingStations] = useState([]);
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

  const apiUrl = 'http://localhost:8080/charger'; // ChargerController의 API 엔드포인트

  // 초기 데이터를 API에서 불러오기
  useEffect(() => {
    const fetchChargingStations = async () => {
      try {
        const response = await axios.post(`${apiUrl}/list`, { location: { /* 위치 정보 입력 */ } });
        setChargingStations(response.data);
      } catch (error) {
        console.error('Error fetching charging stations:', error);
      }
    };

    fetchChargingStations();
  }, []);

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
      id: item.statId, // statId로 변경
      name: item.statNm, // 서버의 응답에 따라 이름이 다를 수 있습니다.
      address: item.addr, // 서버의 응답에 따라 주소가 다를 수 있습니다.
      detailAddress: item.detailAddress,
      price: item.price,
      slot: item.slot,
      connector: item.connector,
      speed: item.speed,
      fee: item.fee,
      parkingFee: item.parkingFee
    });
    setSelectedView('editChargingStation');
  };

  const handleDelete = async (item) => {
    try {
      await axios.delete(`${apiUrl}/place/deleteCharger/${item.statId}`);
      setChargingStations(prevStations =>
          prevStations.filter(station => station.statId !== item.statId)
      );
    } catch (error) {
      console.error('Error deleting charging station:', error);
    }
  };

  const handleSubmit = async () => {
    console.log("handleSubmit 호출됨");
    console.log("inputValues:", inputValues);
    try {
      if (inputValues.id) {
        // Update existing station
        const response = await axios.patch(`&{apiUrl}/place/updateCharger/${inputValues.id}`, inputValues);
        console.log("수정 응답:", response.data);
        setChargingStations(prevStations =>
            prevStations.map(station =>
                station.statId === inputValues.id ? { ...inputValues } : station
            )
        );
      } else {
        // Add new station
        const response = await axios.post(`${apiUrl}/place/addCharger`, inputValues);
        console.log("추가 응답:", response.data);
        setChargingStations(prevStations => [
          ...prevStations,
          { id: response.data.statId, ...inputValues }
        ]);
      }
      setSelectedView('chargingStationList');
    } catch (error) {
      console.error('Error submitting charging station:', error);
    }
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
              if (index === 1) {
                setSelectedView('addChargingStation');
              } else if (index === 2) {
                setSelectedView('editChargingStation');
              } else if (index === 3) {
                setSelectedView('uploadCertificates');
              } else {
                setSelectedView('chargingStationList');
              }
            }}
        >
          <TabList mb='1em'>
            <Tab>충전소 목록</Tab>
            <Tab>충전소 추가</Tab>
            <Tab>충전소 수정</Tab>
            <Tab>사업자 인증</Tab>
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
            <TabPanel>
              {selectedView === 'uploadCertificates' && <UploadCertificates />}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
  );
};

export default Owner;
