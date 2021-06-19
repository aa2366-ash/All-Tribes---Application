import React from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Stack,
  Heading,
  Grid,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Logout from "./Logout";
import { useSelector } from "react-redux";
import { IStore } from "../Redux/rootReducer";
import { FcHome } from "react-icons/fc";
import { useHistory } from "react-router";

const TopNavBar: React.FC = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userName = useSelector<IStore>(
    (store) => store?.user?.currentUser?.name
  ) as string;
  const history = useHistory();

  return (
    <Grid templateRows="70px 1fr" h="100%">
      <Box bg="rgb(226,232,240)" px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box _hover={{ cursor: "pointer" }}>
              <FcHome size="50" onClick={() => history.push("/home")} />
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            ></HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Heading size="md">
              Hello {userName.charAt(0).toUpperCase() + userName.slice(1)}
            </Heading>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
              >
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem justifyContent="center">
                  <Logout />
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}></Stack>
          </Box>
        ) : null}
      </Box>
      {children}
    </Grid>
  );
};
export default TopNavBar;
