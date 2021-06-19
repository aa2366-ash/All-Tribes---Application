import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { InfiniteData, useMutation, useQueryClient } from "react-query";
import { IPost } from "../Types/post";
import deletereq from "../utils/delete";
import flattendeep from "lodash.flattendeep";
import chunk from "lodash.chunk";

interface IDialogueboxProps {
  postId: string;
  isOpen: boolean;
  onClose(): void;
  cancelRef: any;
}
const DeleteDialogBox: React.FC<IDialogueboxProps> = ({
  postId,
  isOpen,
  onClose,
  cancelRef,
}) => {
  const queryClient = useQueryClient();
  const DeletePost = useMutation(
    "deletePost",
    async () => await deletereq(`api/tribes/MyPost/posts/${postId}`),
    {
      onMutate: async () => {
        await queryClient.cancelQueries(["PostList", "MyPost"]);
        const previousPostList = queryClient.getQueryData<
          InfiniteData<IPost[]>
        >(["PostList", "MyPost"]);
        if (previousPostList) {
          const flattenlist = flattendeep(previousPostList.pages);
          const filteredlist = flattenlist.filter((post) => post.id !== postId);
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
      onError: async (_err, _variables, previousPostList) => {
        if (previousPostList)
          queryClient.setQueryData<InfiniteData<IPost[]> | undefined>(
            ["PostList", "MyPost"],
            previousPostList
          );
      },
      onSettled: async () => {
        queryClient.invalidateQueries(["PostList", "MyPost"]);
      },
    }
  );
  const handleDelete = () => {
    DeletePost.mutate();
  };

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Delete Post?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to delete the post?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={onClose} ref={cancelRef}>
              No
            </Button>
            <Button colorScheme="red" ml={3} onClick={handleDelete}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteDialogBox;
