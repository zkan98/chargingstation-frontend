import React from 'react';
import { Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react';




function PasswordInput({ placeholder, name, value, onChange }) {
  const [show, setShow] = React.useState(false);

  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        type={show ? 'text' : 'password'}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}



//
// function PasswordInput() {
//   const [show, setShow] = React.useState(false);
//
//   const handleClick = () => setShow(!show);
//
//   return (
//     <InputGroup size="md">
//       <Input
//         pr="4.5rem"
//         type={show ? 'text' : 'password'}
//         placeholder="Enter password"
//       />
//       <InputRightElement width="4.5rem">
//         <Button h="1.75rem" size="sm" onClick={handleClick}>
//           {show ? 'Hide' : 'Show'}
//         </Button>
//       </InputRightElement>
//     </InputGroup>
//   );
// }
//




export default PasswordInput;
