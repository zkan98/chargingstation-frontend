import { useState } from 'react';
import { Select } from '@chakra-ui/react';

const ConnectType = ({ placeholder }) => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <Select
      placeholder={placeholder}
      value={selectedValue}
      onChange={handleChange}
      width='100%'
      size='md'
    >
      <option value='option1'>Option 1</option>
      <option value='option2'>Option 2</option>
      <option value='option3'>Option 3</option>
    </Select>
  );
};

export default ConnectType;

