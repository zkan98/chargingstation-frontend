import { useState, useEffect } from 'react';
import { Box, Text, Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import TableList from './components/TableList';

const Admin = () => {
  const [selectedTable, setSelectedTable] = useState('userList');
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/list`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getCookie('accessToken')}` // Access Token 사용
          }
        });
        const data = await response.json();
        setUserList(data);
      } catch (error) {
        console.error('Failed to fetch user list:', error);
      }
    };

    fetchUserList();
  }, []);

  const renderTable = () => {
    switch (selectedTable) {
      case 'userList':
        return (
            <TableList
                data={userList}
                caption=""
                columns={[
                  { header: '아이디', accessor: 'id' },
                  { header: '이메일', accessor: 'email' },
                  { header: '커넥트 타입', accessor: 'connectorType' },
                  { header: '유저 타입', accessor: 'userType' }
                ]}
            />
        );
      default:
        return <Box></Box>;
    }
  };

  return (
      <Box>
        <Text textAlign="center" fontSize="2xl" fontWeight="bold" mb={4}>
          관리자페이지
        </Text>
        <Tabs
            isFitted
            variant="enclosed"
            onChange={(index) => {
              const tableNames = ['userList'];
              setSelectedTable(tableNames[index]);
            }}
            mb={4}
        >
          <TabList>
            <Tab>일반 이용자 목록</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>{selectedTable === 'userList' && renderTable()}</TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
  );
};

export default Admin;
