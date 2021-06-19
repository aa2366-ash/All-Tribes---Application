import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  Text,
  PopoverCloseButton,
  PopoverBody,
  Box,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { useQuery, useQueryClient } from "react-query";
import get from "../utils/get";
import deletereq from "../utils/delete";
import { IActivity } from "../Types/activity";
import post from "../utils/post";
interface ILikeProps {
  postId: string;
  isLiked: boolean;
  count: number;
}

const LikePost: React.FC<ILikeProps> = ({ postId, isLiked, count }) => {
  const [like, setlike] = useState(isLiked);
  const [isLoading, setIsLoading] = useState(false);
  const [likeCount, setlikeCount] = useState(count);

  const handlechange = async (postId: string) => {
    try {
      setIsLoading(true);
      setlike((prevValue) => !prevValue);
      let result = like
        ? await deletereq(`api/activity/${postId}`)
        : await post(`api/activity/${postId}`, {});
      setIsLoading(false);
      setlikeCount(result.data.like);
    } catch (error) {}
  };
  return (
    <Stack direction="row" py={2}>
      <Box
        onClick={() => handlechange(postId)}
        _hover={{
          cursor: "pointer",
        }}
      >
        {like ? <FcLike size={22} /> : <FcLikePlaceholder size={22} />}
      </Box>
      <Text>{likeCount}</Text>
      {count > 0 ? (
        <Text _hover={{ cursor: "pointer" }} textDecoration="underline">
          Likes
        </Text>
      ) : (
        <Text> Like </Text>
      )}
    </Stack>
  );
};

export default LikePost;
