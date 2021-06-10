import {
  Button,
  FormControl,
  FormErrorMessage,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from "@chakra-ui/react";
import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Inputfield from "../../components/Inputfield";
import { InfiniteData, useMutation, useQueryClient } from "react-query";
import post from "../../utils/post";
import { IPost } from "../../Types/post";
import { useParams } from "react-router-dom";
import flattendeep from "lodash.flattendeep";
import chunk from "lodash.chunk";

const Schema = yup.object().shape(
  {
    text: yup.string().when("gifUrl", {
      is: (gifUrl: string) => !gifUrl,
      then: yup.string().trim().required("Text content or Gif is Required"),
    }),
    gifUrl: yup.string().when("text", {
      is: (text: string) => !text,
      then: yup.string().trim().required(),
    }),
  },
  [["gifUrl", "text"]]
);
interface IFormValue {
  text?: string;
  gifUrl?: string;
}
interface CreatePostModalProps {
  isOpen: boolean;
  onClose(): void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { register, handleSubmit, reset, formState } = useForm<IFormValue>({
    mode: "onTouched",
    resolver: yupResolver(Schema),
  });
  const { tribeId } = useParams<{ tribeId: string }>();
  const queryClient = useQueryClient();
  const addPostMutation = useMutation(
    "CreatePost",
    async (newPost: IFormValue) =>
      await post(`api/tribes/${tribeId}/posts/`, newPost),
    {
      onMutate: async (newPost: IFormValue) => {
        await queryClient.cancelQueries(["PostList", tribeId]);
        console.log(queryClient.getQueryCache());
        const previousPostList = queryClient.getQueryData<
          InfiniteData<IPost[]> | undefined
        >(["PostList", tribeId]);
        console.log(previousPostList);
        if (previousPostList) {
          const flattenlist = flattendeep(previousPostList.pages);
          flattenlist.unshift({
            id: "",
            ...newPost,
            createdAt: "",
            like: 0,
            isLiked: false,
            creatorId: "",
            tribeId: "",
            tribe: {
              name: "",
              creatorId: "",
              description: "",
              avatarUrl: "",
              coverUrl: "",
              members: 1,
              createdAt: "",
              updatedAt: "",
              id: "",
            },
            creator: {
              id: "",
              createdAt: "",
              updatedAt: "",
              name: "",
              email: "",
              handler: "",
            },
          });
          const chunklist = chunk(flattenlist, 10);
          const mutatedlist = {
            pageParams: previousPostList.pageParams,
            pages: chunklist,
          };
          queryClient.setQueryData<InfiniteData<IPost[]> | undefined>(
            ["PostList", tribeId],
            mutatedlist
          );
        }
        return previousPostList;
      },
      onError: (err, variables, previousPostList) => {
        if (previousPostList)
          queryClient.setQueryData<InfiniteData<IPost[]> | undefined>(
            ["PostList", tribeId],
            previousPostList
          );
      },
      onSettled: () => queryClient.invalidateQueries(["PostList", tribeId]),
    }
  );
  const OnSubmit = handleSubmit((data) => {
    addPostMutation.mutate(data);
    reset();
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>What's happening?</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={OnSubmit}>
          <ModalBody pb={6}>
            <FormControl>
              <Textarea
                {...register("text")}
                placeholder="Type..."
                bg={"gray.100"}
                border={0}
                color={"gray.500"}
                _placeholder={{
                  color: "gray.500",
                }}
              />
              <FormErrorMessage>
                {formState.errors.text?.message}
              </FormErrorMessage>
            </FormControl>
            <Inputfield
              registerProps={register("gifUrl")}
              error={formState.errors["gifUrl"]?.message}
              size="md"
            />
            {/* <Grid width={500} columns={6} fetchGifs={fetchGifs} /> */}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="teal"
              mr={3}
              onClick={onClose}
              type="submit"
              disabled={!formState.isValid}
            >
              Save
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CreatePostModal;
