import { useState } from 'react';
import { Box, Button, Flex, HStack, Text } from '@chakra-ui/react';
import UserTable from './components/Table';

// 샘플
const userList = [
  { from: 'User1', to: 'Email1', factor: 'Active' },
  { from: 'User2', to: 'Email2', factor: 'Inactive' }
];

const chargingStationList = [
  { from: 'Station1', to: 'Location1', factor: '10 chargers' },
  { from: 'Station2', to: 'Location2', factor: '20 chargers' }
];

const chargingStationOperatorList = [
  { from: 'Operator1', to: 'Contact1', factor: 'Region1' },
  { from: 'Operator2', to: 'Contact2', factor: 'Region2' }
];

const Admin = () => {
  const [selectedTable, setSelectedTable] = useState('');

  const handleButtonClick = (tableName) => {
    setSelectedTable(tableName);
  };

  const renderTable = () => {
    switch (selectedTable) {
      case 'userList':
        return <UserTable data={userList} caption="User List" />;
      case 'chargingStationList':
        return <UserTable data={chargingStationList} caption="Charging Station List" />;
      case 'chargingStationOperatorList':
        return <UserTable data={chargingStationOperatorList} caption="Charging Station Operator List" />;
      default:
        return <Box>Select a category to view data.</Box>;
    }
  };

  return (
    <Box>
      <Text textAlign="center" fontSize="2xl" fontWeight="bold" mb={4}>Admin Page</Text>
      <Flex
        bg="gray.100"
        p={4}
        borderBottom="1px solid #e2e8f0"
        align="center"
        justify="center"
        width="100%"
        zIndex={1}
        mb={4}
      >
        <HStack spacing={60}>
          <Button onClick={() => handleButtonClick('userList')}>유저목록</Button>
          <Button onClick={() => handleButtonClick('chargingStationList')}>충전소목록</Button>
          <Button onClick={() => handleButtonClick('chargingStationOperatorList')}>충전소사업자목록</Button>
        </HStack>
      </Flex>
      <Box p={4}>
        {renderTable()}
      </Box>
    </Box>
  );
};

export default Admin;
