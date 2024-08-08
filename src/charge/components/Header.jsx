import { Flex, HStack, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <Flex
      bg="white"
      p={4}
      borderBottom="1px solid #e2e8f0"
      align="center"
      justify="space-between"
      width="100%"
      zIndex={1}
    >
      <Text fontSize="xl" fontWeight="bold" ml={3}>7team</Text>
      <HStack spacing={4}>
        <Button as={Link} to="/login" colorScheme="gray" variant="outline">로그인</Button>
      </HStack>
    </Flex>
  );
}

export default Header;
