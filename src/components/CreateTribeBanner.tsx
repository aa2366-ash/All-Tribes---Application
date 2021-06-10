import {
  Box,
  Heading,
  Stack,
  Button,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import React from "react";
import CreateTribe from "./CreateTribe";

const CreateTribeBanner = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      mt={6}
      w="600px"
      m="auto"
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"2xl"}
      rounded={"md"}
      overflow={"hidden"}
      px={8}
      py={4}
      _hover={{
        boxShadow: "dark-lg",
        rounded: "md",
        bg: "white",
        cursor: "pointer",
      }}
    >
      <Stack direction="row" spacing={20}>
        <Heading size="lg">Create Your Own Tribe!</Heading>
        <Button
          fontFamily={"heading"}
          size="md"
          bgGradient="linear(to-r, teal.200,teal.400)"
          color={"white"}
          _hover={{
            bgGradient: "linear(to-r, teal.400,teal.200)",
            boxShadow: "xl",
          }}
          w="100px"
          onClick={onOpen}
        >
          Create
        </Button>
      </Stack>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody my={8}>
            <CreateTribe />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CreateTribeBanner;
