import {
  Box,
  Heading,
  Square,
  VStack,
  Image,
  HStack,
  Text,
  useColorModeValue,
  Avatar,
  Stack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverCloseButton,
  PopoverHeader,
} from "@chakra-ui/react";
import { IPost } from "../Types/post";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import React from "react";
import LikePost from "./LikePost";

const PostCard: React.FC<IPost> = (post) => {
  return (
    <Box
      width="500px"
      boxShadow={"lg"}
      rounded={"xl"}
      justifyContent="start"
      mx="auto"
      my="20px"
      borderColor="black"
    >
      <Stack direction={"column"} px={3}>
        <Stack direction={"row"} spacing={3}>
          <Avatar
            my={2}
            size={"md"}
            src={post.creator.avatarurl}
            alt={"Author"}
            css={{
              border: "2px solid white",
            }}
          />
          <Text py={5}>
            {post.creator.name.charAt(0).toUpperCase() +
              post.creator.name.slice(1)}
          </Text>
        </Stack>
        {post.text ? <Text size="md">{post.text}</Text> : ""}
        {post.gifUrl ? (
          <Square>
            <Image src={post.gifUrl}></Image>
          </Square>
        ) : (
          ""
        )}
        <LikePost
          count={post.like}
          isLiked={Boolean(post.isLiked)}
          postId={post.id}
        />
      </Stack>
    </Box>
  );
};

export default PostCard;
