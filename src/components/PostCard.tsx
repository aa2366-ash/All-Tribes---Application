import {
  Box,
  Square,
  Image,
  Text,
  Avatar,
  Stack,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { IPost } from "../Types/post";
import React from "react";
import LikePost from "./LikePost";
import { DayConvert } from "../utils/dayjs";

const PostCard: React.FC<IPost> = (post) => {
  const date = DayConvert(post.createdAt);
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
        <HStack>
          <Avatar
            my={2}
            size={"md"}
            src={post.creator.avatarurl}
            alt={"Author"}
            css={{
              border: "2px solid white",
            }}
          />
          <VStack spacing={0} align={"start"}>
            <Text>
              {post.creator.name.charAt(0).toUpperCase() +
                post.creator.name.slice(1)}
            </Text>
            <Text fontSize="xs" color="grey">
              Created At {date}
            </Text>
          </VStack>
        </HStack>
        {post.text ? <Text size="md">{post.text}</Text> : ""}
        {post.gifUrl ? (
          <Square>
            <Image src={post.gifUrl} h="300px"></Image>
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
