import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Text, VStack, HStack, Badge, Link, Divider } from '@chakra-ui/react';

const ChargeDetail = ({ statId, setCurrentView }) => {
  const [chargerDetail, setChargerDetail] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChargerDetail = async () => {
      try {
        const response = await fetch(`http://localhost:8080/charger/place/${statId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
         },
        });
        if (!response.ok) throw new Error('네트워크 연결이 원활하지 않습니다.');
        const data = await response.json();
        setChargerDetail(data);
      } catch (error) {
        console.error('세부정보 가져오기 오류:', error);
      }
    };

    fetchChargerDetail();
  }, [statId]);

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      width="300px"
      boxShadow="md"
      bg="white"
    >
      <VStack align="start" spacing={3}>
        <Badge colorScheme="gray" variant="solid">{chargerDetail.busiNm || '정보 없음'}</Badge>
        <Text fontSize="xl" fontWeight="bold">{chargerDetail.statNm || '정보 없음'}</Text>
        <Text fontSize="sm" color="gray.500">{chargerDetail.addr || '주소 정보 없음'}</Text>
        <Button width="100%" colorScheme="gray" variant="outline">
        <HStack justify="center" width="100%">
            <Text textAlign="center">{chargerDetail.output || '정보 없음'}kW | {chargerDetail.chargingFee || '가격 정보 없음 '}원/kWh</Text>
        </HStack>
        </Button>
        <Divider />
        <Text>리뷰 컴포넌트</Text>
        <Button onClick={() => navigate('/')}>뒤로</Button>
      </VStack>
    </Box>
  );
};

export default ChargeDetail;
