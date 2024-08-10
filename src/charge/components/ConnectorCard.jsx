import { Box, Button, SimpleGrid, Tag, IconButton, Divider, Heading } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

const ConnectorCard = ({ onClose }) => {  // onClose prop을 추가합니다.
  const tags = ['DC차데모','AC완속','DC차데모+AC3상','DC콤보','DC차데모+DC콤보','DC차데모+AC3상+DC콤보','AC3상','DC콤보(완속)'];

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
          커넥터
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

export default ConnectorCard;