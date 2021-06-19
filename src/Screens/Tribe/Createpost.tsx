import { Box, Heading, Stack, useDisclosure } from "@chakra-ui/react";
import CreatePostModal from "../../components/CreatePostModal";
import { FcGallery } from "react-icons/fc";
const Createpost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      mx="auto"
      alignContent="center"
      onClick={onOpen}
      _hover={{ cursor: "pointer", boxShadow: "dark-lg" }}
      height="50px"
      width="350px"
      shadow="lg"
      mt={3}
      borderRadius={10}
    >
      <Stack direction="row" justifyContent="center" py={3}>
        <Heading as="h4" size="md">
          What's happening? Post it!
        </Heading>
        <FcGallery size="26" />
      </Stack>
      <CreatePostModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default Createpost;
