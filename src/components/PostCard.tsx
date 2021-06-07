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
        <Stack direction="row" py={2}>
          {post.isLiked ? (
            <FcLike size={22} />
          ) : (
            <FcLikePlaceholder size={22} />
          )}
          <Text>{post.like}</Text>
          <Popover placement="right" closeOnBlur={true}>
            <PopoverTrigger>
              <Text _hover={{ cursor: "pointer" }} textDecoration="underline">
                {post.like > 1 ? " Likes" : " Like"}
              </Text>
            </PopoverTrigger>
            <PopoverContent color="white" bg="grey.700">
              <PopoverHeader
                pt={4}
                fontWeight="bold"
                border="0"
              ></PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody></PopoverBody>
            </PopoverContent>
          </Popover>
        </Stack>
      </Stack>
    </Box>
  );
};

export default PostCard;
