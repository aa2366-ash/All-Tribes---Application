import React from "react";
import Inputfield from "./Inputfield";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import post from "../utils/post";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  SimpleGrid,
  Stack,
  useToast,
  VStack,
  Text,
  Textarea,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
interface IFormValue {
  name: string;
  description: string;
  avatarUrl: string;
  coverUrl: string;
}
interface IResult {
  message: string;
  err?: {};
}

const schema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .max(15, "Tribe name can contain atmost 15 characters")
    .required("Tribe name is required"),
  description: yup
    .string()
    .min(5, "Description must contain atleast 5 characters")
    .max(100, "Description can contain atmost 100 characters")
    .trim()
    .required("Description is required"),
  avatarUrl: yup.string(),
  coverUrl: yup.string(),
});
const CreateTribe = () => {
  const { register, handleSubmit, reset, formState } = useForm<IFormValue>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const toast = useToast();

  const onSubmit = async (data: IFormValue) => {
    try {
      const result = await post("api/tribe/", data);
      toast({
        title: `Tribe Successfully created`,
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
      reset({ name: "", description: "", avatarUrl: "" });
    } catch (err) {
      toast({
        title: err.message,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box w="400px" bg={"gray.200"} rounded={"md"} m={2}>
        <Stack
          direction={"column"}
          justify={"center"}
          spacing={2}
          p={3}
          alignItems="center"
        >
          <Heading color={"gray.800"} lineHeight={1.1} fontSize="lg">
            Create your own Tribe !
          </Heading>
          <Inputfield
            registerProps={register("name")}
            placeholder="Tribe name"
            error={formState.errors["name"]?.message}
            bg={"gray.100"}
            border={0}
            color={"gray.500"}
            _placeholder={{
              color: "gray.500",
            }}
          />
          <FormControl isInvalid={Boolean(formState.errors["description"])}>
            <Textarea
              {...register("description")}
              placeholder="Why do you need this tribe?"
              bg={"gray.100"}
              border={0}
              color={"gray.500"}
              _placeholder={{
                color: "gray.500",
              }}
            />
            <FormErrorMessage>
              {formState.errors["description"]?.message}
            </FormErrorMessage>
          </FormControl>

          <Inputfield
            registerProps={register("avatarUrl")}
            placeholder="Profile Url 180 x 180"
            bg={"gray.100"}
            border={0}
            color={"gray.500"}
            _placeholder={{
              color: "gray.500",
            }}
          />
          <Inputfield
            registerProps={register("coverUrl")}
            placeholder="Banner Url 820 X 312"
            bg={"gray.100"}
            border={0}
            color={"gray.500"}
            _placeholder={{
              color: "gray.500",
            }}
          />
          <Button
            fontFamily={"heading"}
            size="md"
            bgGradient="linear(to-r, teal.200,teal.400)"
            color={"white"}
            _hover={{
              bgGradient: "linear(to-r, teal.400,teal.200)",
              boxShadow: "xl",
            }}
            w="100px"
            isLoading={formState.isSubmitting}
            type="submit"
          >
            Create
          </Button>
        </Stack>
      </Box>
    </form>
  );
};

export default CreateTribe;
