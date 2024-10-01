// src/pages/Owner.jsx
import axiosInstance from "../api/axiosInstance.js";
import { useState, useEffect } from 'react';
import { Box, Button, Flex, VStack, Text, Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import OwnerTable from './components/OwnerTable';
import OwnerInput from './components/Input';
import Header from './components/Header';
import Address from './components/Address';
import Parking from './components/Parking';
import ConnectorCard from './components/ConnectorCard';
import KwCard from './components/KwCard';
import LocationCard from './components/LocationCard';

// 충전기 타입 매핑
const chgerTypeMap = {
  '01': 'DC차데모',
  '02': 'AC완속',
  '03': 'DC차데모+AC3상',
  '04': 'DC콤보',
  '05': 'DC차데모+DC콤보',
  '06': 'DC차데모+AC3상+DC콤보',
  '07': 'AC3상',
  '08': 'DC콤보(완속)'
};

const Owner = () => {
  const [selectedView, setSelectedView] = useState('chargingStationList');
  const [chargingStations, setChargingStations] = useState([]);
  const [inputValues, setInputValues] = useState({
    statId: '',
    name: '',
    address: '',
    detailAddress: '',
    price: '',
    connector: '',
    speed: '',
    location: '',
    parkingFee: ''
  });

  const [isConnectorOpen, setIsConnectorOpen] = useState(false);
  const [isSpeedOpen, setIsSpeedOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  // 각 선택된 값 저장하는 상태
  const [selectedConnector, setSelectedConnector] = useState(null);
  const [selectedSpeed, setSelectedSpeed] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    fetchChargingStations(); // 컴포넌트가 로드될 때 충전소 목록을 불러옴
  }, []);

  const fetchChargingStations = async () => {
    try {
      const response = await axiosInstance.get(`/charger/ownerList`);
      setChargingStations(response.data); // 목록을 상태로 설정
    } catch (error) {
      console.error('Error fetching charging stations:', error);
      alert(error.response?.data?.message || '충전소 목록을 불러오는 중 오류가 발생했습니다.');
    }
  };

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

  const handleConnectorApply = (value) => {
    setSelectedConnector(value);
    setInputValues((prevValues) => ({
      ...prevValues,
      connector: value
    }));
    setIsConnectorOpen(false);
  };

  const handleSpeedApply = (value) => {
    setSelectedSpeed(value);
    setInputValues((prevValues) => ({
      ...prevValues,
      speed: value
    }));
    setIsSpeedOpen(false);
  };

  const handleLocationApply = (value) => {
    setSelectedLocation(value);
    setInputValues((prevValues) => ({
      ...prevValues,
      location: value
    }));
    setIsLocationOpen(false);
  };

  const handleDelete = async (item) => {
    try {
      if (!item.statId) {
        throw new Error('Invalid item statId');
      }

      await axiosInstance.delete(`/charger/place/deleteCharger/${item.statId}`);
      alert('충전소가 성공적으로 삭제되었습니다.');
      fetchChargingStations(); // 삭제 후 목록을 다시 불러옴
    } catch (error) {
      console.error('Error deleting charger:', error);
      alert(error.response?.data?.message || '충전소 삭제 중 오류가 발생했습니다.');
    }
  };

  const handleSubmit = async () => {
    const { statId, name, address, detailAddress, price, connector, speed, location, parkingFee } = inputValues;
    const requestPayload = {
      statId: statId || '',
      statNm: name,
      addr: address,
      detailAddr: detailAddress, // 상세 주소 추가
      chargingFee: parseFloat(price) || 0.0,
      output: speed,
      chgerType: Object.keys(chgerTypeMap).find(key => chgerTypeMap[key] === connector) || '',
      parkingFree: parkingFee === '무료' ? 'Y' : 'N'
    };

    try {
      let response;
      if (statId) {
        response = await axiosInstance.patch(`/charger/place/updateCharger/${statId}`, requestPayload);
      } else {
        response = await axiosInstance.post(`/charger/place/addCharger`, requestPayload);
      }

      alert(response.data.message || '성공적으로 처리되었습니다.');
      fetchChargingStations(); // 충전소 추가/수정 후 목록을 다시 불러옴
      setInputValues({
        statId: '',
        name: '',
        address: '',
        detailAddress: '',
        price: '',
        connector: '',
        speed: '',
        location: '',
        parkingFee: ''
      });
      setSelectedConnector(null);
      setSelectedSpeed(null);
      setSelectedLocation(null);
    } catch (error) {
      console.error('Error submitting charger:', error);
      alert(error.response?.data?.message || '충전소 제출 중 오류가 발생했습니다.');
    }
  };

  const isSubmitDisabled = !inputValues.name || !inputValues.address || !inputValues.connector || !inputValues.speed;

  return (
      <Box minH="100vh">
        <Header />
        <Tabs
            isFitted
            variant='enclosed'
            onChange={(index) => {
              const views = ['chargingStationList', 'addChargingStation', 'editChargingStation', 'uploadCertificates'];
              setSelectedView(views[index]);
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
              <OwnerTable data={chargingStations} onDelete={handleDelete} />
            </TabPanel>
            <TabPanel>
              <Flex align="center" justify="center" width="100%" height="100%" p={4}>
                <VStack spacing={4} width="400px" bg="white" p={4} borderRadius="md" boxShadow="md">
                  <OwnerInput
                      placeholder="충전소명"
                      name="name"
                      value={inputValues.name}
                      onChange={handleInputChange}
                  />
                  <Address setAddress={handleAddressChange} />
                  <Box border="1px solid" borderColor="gray.300" borderRadius="md" p={2} width="100%">
                    <Text fontSize="md" color="gray.600">{inputValues.address || '기본 주소'}</Text>
                  </Box>
                  <OwnerInput
                      placeholder="상세 주소"
                      name="detailAddress"
                      value={inputValues.detailAddress}
                      onChange={handleInputChange}
                  />
                  <OwnerInput
                      placeholder="kWh당 가격"
                      name="price"
                      type="number"
                      value={inputValues.price}
                      onChange={handleInputChange}
                  />

                  {/* 커넥터 선택 버튼 */}
                  <Button onClick={() => setIsConnectorOpen(true)} colorScheme="teal" width="100%">
                    커넥터 선택
                  </Button>
                  {isConnectorOpen && (
                      <ConnectorCard
                          onClose={() => setIsConnectorOpen(false)}
                          onApply={handleConnectorApply}  // 커넥터 적용 핸들러
                      />
                  )}
                  {selectedConnector && <Text>선택된 커넥터: {selectedConnector}</Text>}

                  {/* 충전속도 선택 버튼 */}
                  <Button onClick={() => setIsSpeedOpen(true)} colorScheme="teal" width="100%">
                    충전속도 선택
                  </Button>
                  {isSpeedOpen && (
                      <KwCard
                          onClose={() => setIsSpeedOpen(false)}
                          onApply={handleSpeedApply}  // 충전속도 적용 핸들러
                      />
                  )}
                  {selectedSpeed && <Text>선택된 충전속도: {selectedSpeed}kW</Text>}

                  {/* 장소 선택 버튼 */}
                  <Button onClick={() => setIsLocationOpen(true)} colorScheme="teal" width="100%">
                    장소 선택
                  </Button>
                  {isLocationOpen && (
                      <LocationCard
                          onClose={() => setIsLocationOpen(false)}
                          onApply={handleLocationApply}  // 장소 적용 핸들러
                      />
                  )}
                  {selectedLocation && <Text>선택된 장소: {selectedLocation}</Text>}

                  <Parking value={inputValues.parkingFee} onChange={handleParkingFeeChange} />

                  {/* 추가 또는 수정 버튼 */}
                  <Button
                      colorScheme="blue"
                      onClick={handleSubmit}
                      isDisabled={isSubmitDisabled} // 필수 값들이 입력되지 않으면 비활성화
                      width="100%"
                  >
                    {inputValues.statId ? '수정' : '추가'}
                  </Button>

                  {/* 선택된 값 표시 */}
                  <Text mt={4}>선택된 커넥터: {selectedConnector || '선택되지 않음'}</Text>
                  <Text>선택된 충전속도: {selectedSpeed || '선택되지 않음'}</Text>
                  <Text>선택된 장소: {selectedLocation || '선택되지 않음'}</Text>
                </VStack>
              </Flex>
            </TabPanel>
            {/* 나머지 TabPanels에 대한 구현 필요 */}
            <TabPanel>
              <Text>충전소 수정 기능은 아직 구현되지 않았습니다.</Text>
            </TabPanel>
            <TabPanel>
              <Text>사업자 인증 기능은 아직 구현되지 않았습니다.</Text>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
  );
};

export default Owner;
