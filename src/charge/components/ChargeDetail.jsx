import { Box, Button, Text, VStack, HStack, Badge, Link, Divider } from '@chakra-ui/react';

const ChargeDetail = ({ setCurrentView }) => {
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
        <Badge colorScheme="gray" variant="solid">사업자</Badge>
        <Link onClick={() => setCurrentView('chargeDetail')} fontSize="xl" fontWeight="bold" cursor="pointer">
          충전소이름
        </Link>
        <Text fontSize="sm" color="gray.500">충전소 주소</Text>
        <Button width="100%" colorScheme="gray" variant="outline">
          <HStack justify="space-between" width="100%">
            <Text>속도 | 요금</Text>
          </HStack>
        </Button>
        <Divider />
        <Text>리뷰컴포넌트</Text>
      </VStack>
    </Box>
  );
};

export default ChargeDetail;
