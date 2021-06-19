import Inputfield from "./Inputfield";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import post from "../utils/post";
import {
  Box,
  Button,
  Heading,
  Stack,
  Textarea,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "react-query";
import { ITribelist } from "../Types/tribe";
interface IFormValue {
  name: string;
  description: string;
  avatarUrl: string;
  coverUrl: string;
}
const schema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .max(20, "Tribe name can contain atmost 20 characters")
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
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, formState } = useForm<IFormValue>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const CreateTribeMutatation = useMutation(
    async (newtribe: IFormValue) => await post("api/tribes/", newtribe),
    {
      onMutate: async (newtribe: IFormValue) => {
        await queryClient.cancelQueries("tribelist");
        const previousTodolist =
          queryClient.getQueryData<ITribelist[]>("tribelist");
        if (previousTodolist)
          queryClient.setQueryData("tribelist", [
            {
              userId: "",
              tribeId: "",
              id: "",
              type: "Admin",
              tribe: {
                ...newtribe,
                creatorId: "",
                members: 1,
                createdAt: "",
                updatedAt: "",
                id: "",
              },
            },
            ...previousTodolist,
          ]);
        return previousTodolist;
      },
      onSettled: () => {
        queryClient.invalidateQueries("tribelist");
      },
      onError: (err, variables, previousTodolist) => {
        if (previousTodolist) {
          queryClient.setQueryData<ITribelist[]>("tribelist", previousTodolist);
        }
      },
    }
  );
  const onSubmit = handleSubmit((data) => {
    CreateTribeMutatation.mutate(data);
    reset();
  });
  return (
    <form onSubmit={onSubmit}>
      <Box w="400px" bg={"gray.200"} rounded={"md"} m="auto">
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
            placeholder="Avatar Url 180 x 180"
            bg={"gray.100"}
            border={0}
            color={"gray.500"}
            _placeholder={{
              color: "gray.500",
            }}
          />
          <Inputfield
            registerProps={register("coverUrl")}
            placeholder="Cover Url 820 X 312"
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
