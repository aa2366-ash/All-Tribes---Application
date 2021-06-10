import {
  Box,
  Stack,
  Square,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  Text,
  Image,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { IPost } from "../Types/post";

import post from "../utils/post";

const PostEditCard: React.FC<IPost> = (post) => {
  return (
    <Box
      width="600px"
      boxShadow={"lg"}
      rounded={"xl"}
      justifyContent="start"
      borderColor="black"
      m="auto"
      my={6}
      p={4}
      bg={useColorModeValue("white", "gray.800")}
    >
      <Stack direction={"column"} px={3}>
        <Stack direction={"row"} spacing={3}>
          <Text size="md">Posted At {post.tribe.name}</Text>
          <IconButton aria-label="Edit" icon={<EditIcon />} />
          <IconButton aria-label="Delete" icon={<DeleteIcon />} />
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

export default PostEditCard;
