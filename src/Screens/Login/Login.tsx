import React from "react";
import IntroductionComp from "../../components/DescriptionBox";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import * as yup from "yup";
import { useHistory } from "react-router-dom";

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
  useToast,
} from "@chakra-ui/react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import { useState } from "react";
import post from "../../utils/post";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../Redux/User/userAction";
import IUser from "../../Types/user";

interface IFormValue {
  email: string;
  password: string;
}

interface IResult {
  message: string;
  accesstoken: string;
  refreshtoken: string;
  user: IUser;
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
  const toast = useToast();
  const history = useHistory();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState, reset } = useForm<IFormValue>({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IFormValue) => {
    try {
      const result = await post("api/session/login", data);
      const { accesstoken, refreshtoken, user } = result;
      localStorage.setItem("accesstoken", accesstoken);
      localStorage.setItem("refreshtoken", refreshtoken);
      dispatch(
        setCurrentUser({ accesstoken, refreshtoken, currentUser: user })
      );
      toast({
        title: `Logged in Successfully`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      history.push("/home");
    } catch (err) {
      toast({
        title: "Error",
        description: err.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };
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
