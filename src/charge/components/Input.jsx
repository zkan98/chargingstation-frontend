import { FormControl, Input, FormErrorMessage, FormHelperText } from '@chakra-ui/react';

const UserInput = ({ placeholder, name, value, onChange, isInvalid, errorMessage, successMessage }) => {
  return (
    <FormControl isInvalid={isInvalid}>

      <Input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {isInvalid ? (
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      ) : successMessage ? (
        <FormHelperText color="green.500">{successMessage}</FormHelperText>
      ) : null}
    </FormControl>
  );
};


export default UserInput;