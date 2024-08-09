import { Radio, RadioGroup, Stack } from '@chakra-ui/react';
import { useState } from 'react';

function ChooseOne() {
  const [value, setValue] = useState('option1');

  return (
    <RadioGroup onChange={setValue} value={value}>
      <Stack direction="row">
        <Radio value="option1">일반 이용자</Radio>
        <Radio value="option2">사업자</Radio>
      </Stack>
    </RadioGroup>
  );
}

export default ChooseOne;
