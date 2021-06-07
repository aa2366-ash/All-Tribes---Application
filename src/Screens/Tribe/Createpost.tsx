import { Box, Button, useDisclosure } from "@chakra-ui/react";
import CreatePostModal from "./CreatePostModal";

const Createpost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box m={12} alignContent="center">
      <Button onClick={onOpen} color="teal" variant="solid">
        Create post
      </Button>
      <CreatePostModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default Createpost;
