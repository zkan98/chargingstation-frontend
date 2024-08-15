import { useState } from 'react';
import { Input } from '@chakra-ui/react';




function UserInput({ placeholder, name, value, onChange, isReadOnly }) {
  return (
    <Input
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      width="100%"
      isReadOnly={isReadOnly}
    />
  );
}

// function UserInput({ placeholder, isReadOnly }) {
//   const [inputValue, setInputValue] = useState('');
//
//   const handleInputChange = (event) => {
//     setInputValue(event.target.value);
//   };
//
//   return (
//     <Input
//       placeholder={placeholder}
//       value={inputValue}
//       onChange={handleInputChange}
//       width="100%"
//       isReadOnly={isReadOnly}
//     />
//   );
// }

export default UserInput;