import { useRef, useState } from 'react';
import { Box, Flex, Button, Text, Input, useDisclosure } from '@chakra-ui/react';
import Header from './components/Header';
import MapView from './components/MapView';
import LocationCard from './components/LocationCard';
import ConnectorCard from './components/ConnectorCard';
import KwCard from './components/KwCard';
import FeeCard from './components/FeeCard';
import ParkingCard from './components/ParkingCard';

function Main() {
  const {
    isOpen: isConnectorOpen, onToggle: onToggleConnector, onClose: onCloseConnector
  } = useDisclosure();
  const {
    isOpen: isLocationOpen, onToggle: onToggleLocation, onClose: onCloseLocation
  } = useDisclosure();
  const {
    isOpen: isKwCardOpen, onToggle: onToggleKwCard, onClose: onCloseKwCard
  } = useDisclosure();
  const {
    isOpen: isFeeCardOpen, onToggle: onToggleFeeCard, onClose: onCloseFeeCard
  } = useDisclosure();
  const {
    isOpen: isParkingCardOpen, onToggle: onToggleParkingCard, onClose: onCloseParkingCard
  } = useDisclosure();

  const [cardPosition, setCardPosition] = useState({ top: '0', left: '0' });

  const [openCard, setOpenCard] = useState(null); // 현재 열린 카드 상태를 관리

  const connectorButtonRef = useRef(null);
  const locationButtonRef = useRef(null);
  const speedButtonRef = useRef(null);
  const feeButtonRef = useRef(null);
  const parkingButtonRef = useRef(null);

  const handleCardOpen = (cardName, buttonRef, onOpen) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setCardPosition({ top: `${rect.bottom}px`, left: `${rect.left}px` });

      // 현재 열린 카드가 있으면 닫기
      if (openCard && openCard !== cardName) {
        switch (openCard) {
          case 'connector':
            onCloseConnector();
            break;
          case 'location':
            onCloseLocation();
            break;
          case 'kw':
            onCloseKwCard();
            break;
          case 'fee':
            onCloseFeeCard();
            break;
          case 'parking':
            onCloseParkingCard();
            break;
          default:
            break;
        }
      }

      // 새로운 카드 열기
      onOpen();
      setOpenCard(cardName);
    }
  };

  return (
    <Box minH="100vh" bg="gray.100">
      <Header />
      <Flex
        bg="white"
        p={4}
        borderBottom="1px solid #e2e8f0"
        align="center"
        width="100%"
        zIndex={1}
        position="relative"
        justify="start"
        gap={4}
        mb={4}
      >
        <Button
          variant="outline"
          colorScheme="teal"
          onClick={() => handleCardOpen('connector', connectorButtonRef, onToggleConnector)}
          ref={connectorButtonRef}
        >
          커넥터
        </Button>
        <Button
          variant="outline"
          colorScheme="teal"
          onClick={() => handleCardOpen('kw', speedButtonRef, onToggleKwCard)}
          ref={speedButtonRef}
        >
          충전속도
        </Button>
        <Button
          variant="outline"
          colorScheme="teal"
          onClick={() => handleCardOpen('fee', feeButtonRef, onToggleFeeCard)}
          ref={feeButtonRef}
        >
          충전요금
        </Button>
        <Button
          variant="outline"
          colorScheme="teal"
          onClick={() => handleCardOpen('parking', parkingButtonRef, onToggleParkingCard)}
          ref={parkingButtonRef}
        >
          주차요금
        </Button>
        <Button
          variant="outline"
          colorScheme="teal"
          onClick={() => handleCardOpen('location', locationButtonRef, onToggleLocation)}
          ref={locationButtonRef}
        >
          장소
        </Button>
      </Flex>

      {isConnectorOpen && (
        <Box
          position="absolute"
          top={cardPosition.top}
          left={cardPosition.left}
          zIndex={2}
        >
          <ConnectorCard onClose={onCloseConnector} />
        </Box>
      )}

      {isLocationOpen && (
        <Box
          position="absolute"
          top={cardPosition.top}
          left={cardPosition.left}
          zIndex={2}
        >
          <LocationCard onClose={onCloseLocation} />
        </Box>
      )}

      {isKwCardOpen && (
        <Box
          position="absolute"
          top={cardPosition.top}
          left={cardPosition.left}
          zIndex={2}
        >
          <KwCard onClose={onCloseKwCard} />
        </Box>
      )}

      {isFeeCardOpen && (
        <Box
          position="absolute"
          top={cardPosition.top}
          left={cardPosition.left}
          zIndex={2}
        >
          <FeeCard onClose={onCloseFeeCard} />
        </Box>
      )}

      {isParkingCardOpen && (
        <Box
          position="absolute"
          top={cardPosition.top}
          left={cardPosition.left}
          zIndex={2}
        >
          <ParkingCard onClose={onCloseParkingCard} />
        </Box>
      )}

      <Box position="relative">
        <MapView />
        <SearchBar />
        <InfoCard />
      </Box>
    </Box>
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
      right="20px"
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
      right="20px"
      zIndex={2}
    >
      <Text fontWeight="bold" mt={2}>충전소 정보 카드</Text>
    </Box>
  );
}

export default Main;
