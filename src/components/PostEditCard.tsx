import {
  Box,
  Stack,
  Square,
  Avatar,
  WrapItem,
  Wrap,
  Text,
  Image,
  IconButton,
  useColorModeValue,
  useDisclosure,
  VStack,
  HStack,
  Badge,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { IPost } from "../Types/post";
import React from "react";
import DeleteDialogBox from "./DeleteDialogBox";
import EditDialogBox from "./EditDialogBox";
import LikePost from "./LikePost";
import { DayConvert } from "../utils/dayjs";

const PostEditCard: React.FC<IPost> = (post) => {
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  const cancelRef = React.useRef();
  const date = DayConvert(post.createdAt);
  return (
    <Box
      width="600px"
      boxShadow={"lg"}
      rounded={"xl"}
      borderColor="black"
      my="20px"
      p={4}
      bg={useColorModeValue("white", "gray.800")}
    >
      <Stack direction={"column"} px={3}>
        <HStack spacing={3}>
          <Wrap flex="1">
            <WrapItem>
              <Avatar name="Dan Abrahmov" src={post.tribe.avatarUrl} />

              <VStack spacing={0} align={"start"} px={2}>
                <Text size="md">{post.tribe.name}</Text>
                <HStack>
                  <Text fontSize="xs" color="grey">
                    {date}
                    {post.createdAt !== post.updatedAt && (
                      <Badge colorScheme="purple" ml="1" fontSize="0.7em">
                        Edited
                      </Badge>
                    )}
                  </Text>
                </HStack>
              </VStack>
            </WrapItem>
          </Wrap>

          <IconButton
            aria-label="Edit"
            icon={<EditIcon />}
            onClick={onOpenEdit}
          />
          <IconButton
            aria-label="Delete"
            icon={<DeleteIcon />}
            onClick={onOpenDelete}
          />
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
        <DeleteDialogBox
          postId={post.id}
          isOpen={isOpenDelete}
          onClose={onCloseDelete}
          cancelRef={cancelRef}
        />
        <EditDialogBox
          postId={post.id}
          isOpen={isOpenEdit}
          onClose={onCloseEdit}
          text={post?.text}
          gifUrl={post?.gifUrl}
        />
      </Stack>
    </Box>
  );
};

export default PostEditCard;
