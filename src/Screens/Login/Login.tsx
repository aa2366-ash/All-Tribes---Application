import React from "react";
import IntroductionComp from "../../components/Introduction";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import * as yup from "yup";
import {
  Box,
  Input,
  Stack,
  Heading,
  FormControl,
  FormLabel,
  HStack,
  Radio,
  RadioGroup,
  Button,
  Grid,
  VStack,
  Select,
  FormErrorMessage,
  Text,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import { useState } from "react";

export interface Inputs {
  email: string;
  password: string;
}
const schema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email("Email should have correct format")
    .required("Email id is required"),
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters")
    .trim()
    .required("Password is required"),
});

const Login = () => {
  const { register, handleSubmit, formState } = useForm<Inputs>({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: Inputs) => console.log(data);
  const [show, setShow] = useState(false);

  return (
    <Grid templateColumns="repeat(2, 1fr)" h="100%">
      <IntroductionComp />

      <VStack justifyContent="center" p={20}>
        <Heading> Welcome to the tribe!</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <FormControl isInvalid={Boolean(formState.errors["email"])}>
              <FormLabel>Email address</FormLabel>
              <Input
                {...register("email")}
                variant="filled"
                placeholder="example@example.com"
              />
              <FormErrorMessage>
                {formState.errors["email"]?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={Boolean(formState.errors["password"])}>
              <FormLabel>Password</FormLabel>
              <InputGroup size="md">
                <Input
                  variant="filled"
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                  {...register("password")}
                />
                <InputRightElement width="4.5rem">
                  {show ? (
                    <ViewIcon onClick={() => setShow(!show)} />
                  ) : (
                    <ViewOffIcon onClick={() => setShow(!show)} />
                  )}
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>
                {formState.errors["password"]?.message}
              </FormErrorMessage>
            </FormControl>
            <Button size="md" colorScheme="teal" type="submit">
              Login
            </Button>
          </Stack>
        </form>
        <HStack>
          <Text>Dont have an account?</Text>
          <Text as="a" color="teal" href="#" fontWeight="bold">
            <Link to="/register">Register</Link>
          </Text>
        </HStack>
      </VStack>
    </Grid>
  );
};

export default Login;
