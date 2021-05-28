import {
  Box,
  Flex,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  FormControl,
  FormLabel,
  VStack,
  Heading,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Inputfield from "../../components/Inputfield";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useQuery from "../../utils/queryparam";
import post from "../../utils/post";

interface IFormValue {
  handler: string;
  password: string;
}
interface IResult {
  message: string;
  err?: {};
}
const schema = yup.object().shape({
  handler: yup
    .string()
    .trim()
    .matches(/^\S*$/, "Userhandle should not contain white spaces")
    .required("Userhandle is required"),
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters")
    .trim()
    .matches(/^\S*$/, "Password should not contain white spaces")
    .required("Password is required"),
});
const Invite = () => {
  const query = useQuery();
  const toast = useToast();
  const queryparam = {
    code: query.get("code"),
    email: query.get("email"),
    name: query.get("name"),
  };
  const [show, setShow] = useState(false);
  const handleClick = () => {
    setShow(!show);
  };
  const { register, handleSubmit, reset, formState } = useForm<IFormValue>({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IFormValue) => {
    try {
      const user = { ...data, ...queryparam };
      const result = await post<IResult>("api/user/", user);
      toast({
        title: `User successfully registered`,
        description: "We've created an account for you. kindly login.",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
      reset({ handler: "", password: "" });
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
    <Flex
      bg="teal.500"
      minH="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        h="350px"
        bg="white"
        w="400px"
        borderRadius="10px"
        boxShadow="lg"
        textAlign="center"
      >
        <Heading as="h3" size="lg" p={3}>
          {queryparam.name
            ? `Hi ${
                queryparam.name?.substring(0, 1).toUpperCase() +
                queryparam.name?.substring(1)
              }`
            : "Email verification"}
        </Heading>

        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={5} mx="20px">
            <Inputfield
              registerProps={register("handler")}
              label="Userhandle"
              error={formState.errors["handler"]?.message}
            />
            <FormControl
              isInvalid={Boolean(formState.errors["password"]?.message)}
            >
              <FormLabel>Password</FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                  {...register("password")}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>
                {formState.errors["password"]?.message}
              </FormErrorMessage>
            </FormControl>
            <Button type="submit" colorScheme="teal">
              SignUp
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};

export default Invite;
