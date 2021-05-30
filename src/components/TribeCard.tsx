import React from "react";
import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  useColorModeValue,
  TagLabel,
  Tag,
} from "@chakra-ui/react";
import { ITribelist } from "../Types/tribe";

interface ITribelistProps {
  tribe: ITribelist;
}

const Tribelist: React.FC<ITribelistProps> = ({ tribe }) => {
  const tribedata = tribe.tribe;
  return (
    <Center py={2}>
      <Box
        maxW={"270px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
        p={2}
      >
        <Stack direction={"row"} justify={"start"} spacing={2}>
          <Avatar
            size={"md"}
            src={tribedata.avatarUrl}
            alt={"Author"}
            css={{
              border: "2px solid white",
            }}
          />{" "}
          <Stack spacing={0} align={"start"} mb={5}>
            <Heading fontSize={"lg"} fontWeight={500} fontFamily={"body"}>
              {tribedata.name}
            </Heading>
            <Stack direction={"row"}>
              <Text fontSize={"sm"} color={"gray.500"}>
                {tribedata.members} Members
              </Text>
              <Tag size="sm" colorScheme="red" borderRadius="full">
                <TagLabel>{tribe.type}</TagLabel>
              </Tag>
            </Stack>
          </Stack>
        </Stack>

        <Box>
          <Text
            color={"gray.500"}
            fontSize={"sm"}
            noOfLines={2}
            overflow={"hidden"}
          >
            {tribedata.description}
          </Text>
        </Box>
      </Box>
    </Center>
  );
};

export default Tribelist;
