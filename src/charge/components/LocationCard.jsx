import { Box, Button, SimpleGrid, Tag, IconButton, Divider, Heading } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

const LocationCard = ({ onClose }) => {  // onClose prop을 추가합니다.
  const tags = ['휴게소', '공영주차장', '공공기관/공공장소', '숙박', '관광지/문화시설', '골프/스포츠', '쇼핑'];

  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
      maxW="sm"
      margin="auto"
      bg="white"
    >
      {/* Header with title and close icon */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Heading as="h3" size="md">
          장소
        </Heading>
        <IconButton
          icon={<CloseIcon />}
          variant="ghost"
          size="sm"
          aria-label="Close"
          onClick={onClose}  // 클릭 시 onClose 호출
        />
      </Box>
      <Divider />

      {/* Tags Grid */}
      <SimpleGrid columns={3} spacing={2} mb={4} mt={4}>
        {tags.map((tag) => (
          <Tag
            key={tag}
            size="lg"
            variant="solid"
            bg="gray.100"
            color="black"
            textAlign="center"
            justifyContent="center"
            p={2}
            cursor="pointer"
          >
            {tag}
          </Tag>
        ))}
      </SimpleGrid>
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

export default LocationCard;
