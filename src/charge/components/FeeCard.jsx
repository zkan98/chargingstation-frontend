import { Box, Button, Slider, SliderTrack, SliderFilledTrack, SliderThumb, IconButton, Divider, Heading, Text } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { useState } from 'react';

const FeeCard = ({ onClose }) => {
  const [value, setValue] = useState(0); // 슬라이더 값을 상태로 관리

  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
      maxW="sm" // ConnectorCard와 같은 크기로 설정
      bg="white"
    >
      {/* Header with title and close icon */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Heading as="h3" size="md">
          충전요금(kWh)
        </Heading>
        <IconButton
          icon={<CloseIcon />}
          variant="ghost"
          size="sm"
          aria-label="Close"
          onClick={onClose}
        />
      </Box>
      <Divider />

      {/* Slider with labels */}
      <Box mt={4} p={4} pt={6}>
        <Box mb={2} textAlign="center"> {/* 슬라이더 위에 텍스트 표시 */}
          <Text fontSize='lg' fontWeight='bold'>
            {value === 0 ? '무료' : value === 7 ? '전체' : `${value * 100}kWh`}
          </Text>
        </Box>
        <Slider
          aria-label='slider-ex-1'
          defaultValue={0}
          min={0}
          max={7}
          step={1}
          value={value}
          onChange={(val) => setValue(val)} // 슬라이더 값이 변경될 때 상태 업데이트
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Box>
      <Divider />

      {/* Buttons */}
      <Box display="flex" justifyContent="space-between" mt={4}>
        <Button variant="outline" colorScheme="gray">
          초기화
        </Button>
        <Button colorScheme="blue">적용</Button>
      </Box>
    </Box>
  );
};

export default FeeCard;
