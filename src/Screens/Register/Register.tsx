import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import IntroductionComp from "../../components/DescriptionBox";
import * as yup from "yup";
import post from "../../utils/post";

import {
  Input,
  Stack,
  Heading,
  FormControl,
  FormLabel,
  HStack,
  Button,
  Grid,
  VStack,
  FormErrorMessage,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export interface IFormValue {
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

const Register: React.FC = () => {
  const { register, handleSubmit, formState, reset } = useForm<IFormValue>({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const toast = useToast();

  const onSubmit = async (data: IFormValue) => {
    try {
      const user = { ...data };
      const result = await post("api/invite/", user);
      toast({
        title: `Invite sent to ${result.data.email}`,
        description: "Login to your registered email id and accept the invite.",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
      reset({ name: "", email: "" });
    } catch (err) {
      toast({
        title: `Error`,
        description: err?.message,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

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

            <Button
              size="md"
              colorScheme="teal"
              type="submit"
              isLoading={formState.isSubmitting}
            >
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
