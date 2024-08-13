import { useState } from 'react';
import { Box, Button, SimpleGrid, Tag, IconButton, Divider, Heading } from '@chakra-ui/react';
import { CloseIcon, RepeatIcon } from '@chakra-ui/icons';

const ConnectorCard = ({ onClose }) => {
  const tags = ['DC차데모', 'AC완속', 'DC차데모+AC3상', 'DC콤보', 'DC차데모+DC콤보', 'DC차데모+AC3상+DC콤보', 'AC3상', 'DC콤보(완속)'];
  
  // 선택된 태그를 저장하는 상태 변수
  const [selectedTags, setSelectedTags] = useState([]);

  // 태그 클릭 시 선택/해제 처리 함수
  const handleTagClick = (tag) => {
    setSelectedTags(prevSelectedTags =>
      prevSelectedTags.includes(tag)
        ? prevSelectedTags.filter(t => t !== tag)
        : [...prevSelectedTags, tag]
    );
  };

  // 초기화 함수
  const handleReset = () => {
    setSelectedTags([]);
  };

  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
      width="400px"
      margin="auto"
      bg="white"
    >

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Heading as="h3" size="md">
          커넥터
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

      {/* Tags Grid */}
      <SimpleGrid columns={3} spacing={2} mb={4} mt={4}>
        {tags.map((tag) => (
          <Tag
            key={tag}
            size="lg"
            variant="solid"
            bg={selectedTags.includes(tag) ? 'teal.500' : 'gray.100'}
            color={selectedTags.includes(tag) ? 'white' : 'black'}
            textAlign="center"
            justifyContent="center"
            p={2}
            cursor="pointer"
            onClick={() => handleTagClick(tag)} // 클릭 시 태그 선택/해제
          >
            {tag}
          </Tag>
        ))}
      </SimpleGrid>
      <Divider />

      {/* Buttons */}
      <Box display="flex" justifyContent="flex-end" mt={4}>
        <Button
          variant="outline"
          colorScheme="gray"
          onClick={handleReset} // 초기화 버튼 클릭 시 초기화 처리
          leftIcon={<RepeatIcon />}
          mr={2}
        >
        </Button>
        <Button colorScheme="blue">
          적용
        </Button>
      </Box>
    </Box>
  );
};

export default ConnectorCard;
