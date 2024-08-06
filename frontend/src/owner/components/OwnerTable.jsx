import { Table, TableContainer, TableCaption, Thead, Tbody, Tr, Th, Td, Button, HStack } from '@chakra-ui/react';


// 데이터와 캡션을 props로 받는 테이블 컴포넌트
const OwnerTable = ({ data, caption }) => {
  const handleEdit = (index) => {
    console.log('Edit item at index:', index);
  };

  const handleDelete = (index) => {
    console.log('Delete item at index:', index);
  };

  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>{caption}</TableCaption>
        <Thead>
          <Tr>
            <Th>충전소 이름</Th>
            <Th>주소</Th>
            <Th isNumeric>요금</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row, index) => (
            <Tr key={index}>
              <Td>{row.from}</Td>
              <Td>{row.to}</Td>
              <Td isNumeric>{row.factor}</Td>
              <Td textAlign="right"></Td>
              <Td>
                <HStack spacing={2}>
                  <Button colorScheme="teal" size="sm" onClick={() => handleEdit(index)}>수정</Button>
                  <Button colorScheme="red" size="sm" onClick={() => handleDelete(index)}>삭제</Button>
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default OwnerTable;
