import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputProps,
} from "@chakra-ui/react";
import React from "react";
import { UseFormRegister, UseFormRegisterReturn } from "react-hook-form";

interface InputfieldProps extends InputProps {
  label?: string;
  registerProps: UseFormRegisterReturn;
  error?: string | string[];
}
const Inputfield: React.FC<InputfieldProps> = ({
  label,
  registerProps,
  error,
  ...props
}) => {
  return (
    <FormControl isInvalid={Boolean(error)}>
      {label && <FormLabel>{label}</FormLabel>}
      <Input {...registerProps} {...props} />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

export default Inputfield;
