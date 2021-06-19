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
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Inputfield from "./Inputfield";
import { InfiniteData, useMutation, useQueryClient } from "react-query";
import patch from "../utils/patch";
import { IPost } from "../Types/post";
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

interface EditPostModalProps {
  isOpen: boolean;
  onClose(): void;
  text?: string;
  gifUrl?: string;
  postId: string;
}
const EditDialogBox: React.FC<EditPostModalProps> = ({
  isOpen,
  onClose,
  text,
  gifUrl,
  postId,
}) => {
  const { register, handleSubmit, reset, formState } = useForm<IFormValue>({
    mode: "onTouched",
    resolver: yupResolver(Schema),
  });
  const queryClient = useQueryClient();
  const editPostMutation = useMutation(
    "EditPost",
    async (newPost: IFormValue) =>
      await patch(`api/tribes/MyPost/posts/${postId}`, newPost),
    {
      onMutate: async (newPost: IFormValue) => {
        await queryClient.cancelQueries(["PostList", "MyPost"]);
        const previousPostList = queryClient.getQueryData<
          InfiniteData<IPost[]> | undefined
        >(["PostList", "MyPost"]);
        if (previousPostList) {
          const flattenlist = flattendeep(previousPostList.pages);
          const filteredlist = flattenlist.map((post) =>
            post.id === postId
              ? { ...post, text: newPost.text, gifUrl: newPost.gifUrl }
              : post
          );
          const chunklist = chunk(filteredlist, 10);
          const mutatedlist = {
            pageParams: previousPostList.pageParams,
            pages: chunklist,
          };
          queryClient.setQueryData<InfiniteData<IPost[]> | undefined>(
            ["PostList", "MyPost"],
            mutatedlist
          );
        }
        return previousPostList;
      },
      onError: (_err, _variables, previousPostList) => {
        if (previousPostList)
          queryClient.setQueryData<InfiniteData<IPost[]> | undefined>(
            ["PostList", "MyPost"],
            previousPostList
          );
      },
      onSettled: () => queryClient.invalidateQueries(["PostList", "MyPost"]),
    }
  );
  const OnSubmit = handleSubmit((data) => {
    editPostMutation.mutate(data);
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
                defaultValue={text}
              />
              <FormErrorMessage>
                {formState.errors.text?.message}
              </FormErrorMessage>
            </FormControl>
            <Inputfield
              registerProps={register("gifUrl")}
              error={formState.errors["gifUrl"]?.message}
              size="md"
              placeholder="Post Image or Gif Url "
              defaultValue={gifUrl}
            />
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

export default EditDialogBox;
