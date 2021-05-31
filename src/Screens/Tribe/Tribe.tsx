import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
  Grid,
  VStack,
} from "@chakra-ui/react";
import { IoIosPeople } from "react-icons/io";
import React from "react";

const Tribe = () => {
  return (
    <Grid templateColumns="70% 1fr" h="100%">
      <Box
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Image
          h={"120px"}
          w={"full"}
          src={
            "https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
          }
          objectFit={"cover"}
        />
        <Stack direction={"row"} spacing="2px">
          <Flex mt={-6} ml={4}>
            <Avatar
              size={"xl"}
              src={
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
              }
              alt={"Author"}
              css={{
                border: "2px solid white",
              }}
            />
          </Flex>
          <Stack direction={"column"} spacing={0} align={"start"}>
            <Stack direction={"row"} align={"start"} mt={2}>
              <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
                Tribe Name
              </Heading>
              <IoIosPeople />
              <Text fontSize="xs">100</Text>
            </Stack>

            <Text color={"gray.500"}>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean m
            </Text>
          </Stack>
        </Stack>
      </Box>
      <Box
        bg={useColorModeValue("teal.400", "teal.200")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Heading color="white" mx={3}>
          CHAT BOX!
        </Heading>
      </Box>
    </Grid>
  );
};

export default Tribe;
