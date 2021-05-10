import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import IntroductionComp from "../../components/Introduction";
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
} from "@chakra-ui/react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";

export interface Inputs {
  name: string;
  email: string;
}

const schema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed")
    .required("Username is required"),
  email: yup
    .string()
    .trim()
    .email("Email should have correct format")
    .required("Email id is required"),
});

const Register = () => {
  const { register, handleSubmit, formState } = useForm<Inputs>({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: Inputs) => console.log(data);
  return (
    <Grid templateColumns="1fr 1fr" h="100%">
      <IntroductionComp />
      <VStack justifyContent="center">
        <Heading>Join the tribe!</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <FormControl isInvalid={Boolean(formState.errors["name"])}>
              <FormLabel>Username</FormLabel>
              <Input
                {...register("name")}
                variant="filled"
                placeholder="first name and Last name"
              />
              <FormErrorMessage>
                {formState.errors["name"]?.message}
              </FormErrorMessage>
            </FormControl>
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

            <Button size="md" colorScheme="teal" type="submit">
              Register
            </Button>
          </Stack>
        </form>
        <HStack>
          <Text>Already have an account?</Text>
          <Text as="a" color="teal.400" href="#" fontWeight="bold">
            <Link to="/login">Login to Tribe</Link>
          </Text>
        </HStack>
      </VStack>
    </Grid>
  );
};
export default Register;
