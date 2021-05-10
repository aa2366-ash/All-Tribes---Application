import {
  InputGroup,
  Input,
  InputRightElement,
  Button,
  Box,
  FormLabel,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { Inputs } from "../Register/Register";

import * as Yup from "yup";

interface PasswordPros {
  register: UseFormRegister<Inputs>;
}

const Password: React.FC<PasswordPros> = ({ register }) => {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
  };
  return (
    <Stack spacing={3}>
      <FormLabel>Password</FormLabel>
      <InputGroup size="md">
        <Input
          variant="filled"
          pr="4.5rem"
          type={show ? "text" : "password"}
          placeholder="Enter password"
        />
        <InputRightElement width="4.5rem">
          <Button
            h="1.75rem"
            size="sm"
            onClick={(e) => {
              console.log(e);
              handleClick();
            }}
          >
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      <Input
        variant="filled"
        pr="4.5rem"
        type="password"
        placeholder="Confirm password"
      />
    </Stack>
  );
};

export default Password;
