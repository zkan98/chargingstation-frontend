import { Table, TableContainer, TableCaption, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

// 데이터와 캡션을 props로 받는 테이블 컴포넌트
const UserTable = ({ data, caption }) => {
  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>{caption}</TableCaption>
        <Thead>
          <Tr>
            <Th>From</Th>
            <Th>To</Th>
            <Th isNumeric>Factor</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row, index) => (
            <Tr key={index}>
              <Td>{row.from}</Td>
              <Td>{row.to}</Td>
              <Td isNumeric>{row.factor}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;